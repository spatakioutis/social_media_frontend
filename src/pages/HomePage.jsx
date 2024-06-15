import React from "react"
import {useAxios} from '../hooks/AxiosInterceptor'
import {useState, useEffect} from 'react'

import PageHeader from '../components/header/PageHeader.jsx'
import Post from '../components/post/Post.jsx'
import '../styles/HomePage.css'

const HomePage = () => {
    const axiosInstance = useAxios()
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const response = await axiosInstance.get(`http://localhost:5000/posts?page=${page}&limit=10`)
                setPosts(prevPosts => [...prevPosts, ...response.data.posts])
            }
            catch (error) {
                console.error('Error fetching posts:', error)
            }
            setLoading(false)
        }
        fetchPosts()
    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
                setPage(prevPage => prevPage + 1)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const postElements = posts.map((post) => {
        return <Post 
                key={post.createdAt}
                username= {post.userInfo.username}
                userProfPic= {post.userInfo.profilePic}
                text= {''}
                image= {post.image}
                likeCount= {post.likes}
                commentCount= {0}
            />
    })

    return <>
            <PageHeader/>
            <div className="home--page--body">
                {postElements}
                {loading && <p>Loading...</p>}
            </div>
    </>
}

export default HomePage