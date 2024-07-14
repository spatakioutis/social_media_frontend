import React from "react"
import {useState, useEffect} from 'react'

import {useAxios} from '../hooks/AxiosInterceptor'
import PageHeader from '../components/page-header/PageHeader.jsx'
import Post from '../components/post/Post.jsx'
import CreatePostCard from "../components/post/CreatePostCard.jsx"
import NewPostForm from "../components/post/NewPostForm.jsx"
import '../styles/pages/HomePage.css'

const HomePage = () => {
    const axiosInstance = useAxios()
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [newPostModalActive, setNewPostModalActive] = useState(false)
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const response = await axiosInstance.get(`http://localhost:5000/posts?page=${page}&limit=10`)
                setPosts(prevPosts => [...prevPosts, ...response.data.posts])
            }
            catch (error) {
                console.log('Error fetching posts:', error)
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

    const handlePostDelete = (postId) => {
        setPosts((prevPosts) => 
            prevPosts.filter(post => post._id !== postId)
        )
    }

    const postElements = posts.map((post) => {
        return <Post 
                    postID={post._id}
                    key={post.createdAt}
                    username= {post.userInfo.username}
                    userProfPic= {post.userInfo.profilePic}
                    image= {post.image}
                    caption= {post.caption}
                    likes= {post.likes}
                    comments= {post.comments}
                    deletePost={handlePostDelete}
            />
    })

    return (
        <div className="home--page">
                <PageHeader/>
                <CreatePostCard openModal={ () => {setNewPostModalActive(true)}}/>
                {newPostModalActive && 
                    <NewPostForm closeModal={ () => {setNewPostModalActive(false)}} />
                }
                <div className="home--page--body">
                    {postElements}
                    {loading && <p>Loading...</p>}
                </div>
        </div>
    )
}

export default HomePage