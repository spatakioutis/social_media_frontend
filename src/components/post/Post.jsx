import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FaRegComment } from "react-icons/fa";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

import {useAxios} from '../../hooks/AxiosInterceptor.jsx'
import {useAuth} from '../../hooks/AuthProvider.jsx'
import {comments} from '../../assets/data.js'
import CommentModal from "../comment/CommentModal.jsx";
import '../../styles/post/Post.css'

const Post = (props) => {
    const navigate = useNavigate()
    const auth = useAuth()
    const axiosInstance = useAxios()

    const [isLiked, setIsLiked] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const toggleModal = () => {
        setModalIsOpen((prev) => !prev)
    };

    const goToProfile = () => {
        navigate('/user', {state: {username: props.username}})
    }

    const handlePostDelete = async () => {
        try {
            await axiosInstance.delete(`http://localhost:5000/posts?postID=${props.postId}`)
            props.deletePost(props.postId)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="postCard">
            <div className="post--header">
                <div className="post--profile">
                    <img 
                        className="post--profil--picture" 
                        src={props.userProfPic} 
                        alt="user picture"
                        onClick={goToProfile}                    
                    />
                    <h3 
                        className="post--username"
                        onClick={goToProfile}                                    
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
            <div className="post--options">
                <div className='post--likes'>
                    {isLiked ? 
                    <IoIosHeart 
                            className="post--likeButton"
                            color="red"
                            onClick={() => setIsLiked(prev => !prev)}
                    /> :
                    <IoIosHeartEmpty 
                            className="post--likeButton"
                            onClick={() => setIsLiked(prev => !prev)}
                    /> 
                    }
                    <h5 
                        className='post--likeCount'
                    > 
                        {props.likeCount}
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
                        {props.commentCount}
                    </h5>
                </div>                
            </div>
            <div className='post--caption'>
                { props.text && 
                <p className="post--caption">
                    {props.text}
                </p>
                }
            </div>
            { modalIsOpen &&
            <CommentModal 
                        comments={comments}
                        toggleModal={toggleModal} 
                        isOpen={modalIsOpen}
            />
            }
        </div>
    )
}

export default Post