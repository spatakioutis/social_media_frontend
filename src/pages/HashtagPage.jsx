import React from "react"
import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import {useAxios} from '../hooks/AxiosInterceptor'
import PageHeader from '../components/page-header/PageHeader.jsx'
import Post from '../components/post/Post.jsx'
import '../styles/pages/HashtagPage.css'

const HashtagPage = () => {
    const axiosInstance = useAxios()

    const [searchParams] = useSearchParams()
    const tag = searchParams.get('tag')

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const response = await axiosInstance.get(`http://localhost:5000/hashtags?tag=${tag}`)
                setPosts(response.data.posts)
            }
            catch (error) {
                console.log('Error fetching posts:', error)
            }
            setLoading(false)
        }
        fetchPosts()
    }, [tag])

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
        <div className="hashtag--page">
                <PageHeader/>
                <div className="hashtag--title">
                    {`Showing posts for `} <strong>{`#${tag}`}</strong>
                </div>
                <div className="hashtag--page--body">
                    {postElements}
                    {loading && <p>Loading...</p>}
                </div>
        </div>
    )
}

export default HashtagPage