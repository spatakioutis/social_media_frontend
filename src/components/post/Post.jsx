import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { FaRegComment } from "react-icons/fa"
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import {useAxios} from '../../hooks/AxiosInterceptor.jsx'
import {useAuth} from '../../hooks/AuthProvider.jsx'
import CommentModal from "../comment/CommentModal.jsx"
import HashtagText from "../hashtags/HashtaggedText.jsx"
import '../../styles/post/Post.css'

const extractHashtags = (text) => {
    const regex = /#(\w+)/g
    let matches
    const hashtags = []

    while ((matches = regex.exec(text)) !== null) {
        hashtags.push(matches[1].toLowerCase())
    }

    return hashtags
}

const Post = (props) => {
    const navigate = useNavigate()
    const auth = useAuth()
    const axiosInstance = useAxios()

    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(props.likes.length)
    const [commentCount, setCommentCount] = useState(props.comments.length)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const toggleModal = () => {
        setModalIsOpen((prev) => !prev)
    }

    const goToProfile = (username) => {
        navigate(`/user?username=${username}`)
    }

    const handlePostDelete = async () => {
        try {
            await axiosInstance.delete(`http://localhost:5000/posts?postID=${props.postID}`)
            props.deletePost(props.postID)
        }
        catch (error) {
            console.log(error)
        }
    }

    const likePost = async () => {
        try {
            await axiosInstance.post(`http://localhost:5000/posts/likes`, {
                postID: props.postID
            })
            setIsLiked(true)
            setLikeCount(prevCount => prevCount + 1)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteLikeFromPost = async () => {
        try {
            await axiosInstance.delete(`http://localhost:5000/posts/likes?postID=${props.postID}`)
            setIsLiked(false)
            setLikeCount(prevCount => prevCount - 1)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (props.likes.some( like => like && like.toString() === auth.user.userID.toString()) ) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [props.likes, auth.user.username])

    return (
        <div className="postCard">
            <div className="post--header">
                <div className="post--profile">
                    <img 
                        className="post--profil--picture" 
                        src={props.userProfPic} 
                        alt="user picture"
                        onClick={() => goToProfile(props.username)}                    
                    />
                    <h3 
                        className="post--username"
                        onClick={() => goToProfile(props.username)}                                    
                    >
                        {props.username}
                    </h3>
                </div>
                {auth.user.username === props.username &&
                    <DeleteForeverIcon 
                                className="delete--icon"
                                onClick={handlePostDelete}
                    />
                }
            </div>
            { props.image !== null ?
            <img 
                className="post--image" 
                src={props.image} 
                alt="Failed to load image"
            /> :
            <h4 
                className="Error for image"
            >
                Error: Failed to load image
            </h4>
            }
            <div className="post--caption">
                <p className="caption--username">{props.username}</p>
                <HashtagText 
                    className="caption--text"
                    text={props.caption}
                />
            </div>
            <div className="post--options">
                <div className='post--likes'>
                    {isLiked ? 
                    <IoIosHeart 
                            className="post--likeButton"
                            color="red"
                            onClick={deleteLikeFromPost}
                    /> :
                    <IoIosHeartEmpty 
                            className="post--likeButton"
                            onClick={likePost}
                    /> 
                    }
                    <h5 
                        className='post--likeCount'
                    > 
                        {likeCount}
                    </h5>
                </div>
                <div className='post--comments'>
                    <FaRegComment 
                            className="post--commentButton" 
                            onClick={toggleModal}
                    />
                    <h5 
                        className='post--commentCount'
                    >
                        {commentCount}
                    </h5>
                </div>                
            </div>
            { modalIsOpen &&
            <CommentModal 
                    toggleModal={toggleModal} 
                    isOpen={modalIsOpen}
                    postID={props.postID}
            />
            }
        </div>
    )
}

export default Post