import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import {useState} from 'react'

import {comments} from '../../assets/data.js'
import CommentModal from "../comment/CommentModal.jsx";
import '../../styles/post/Post.css'

const Post = (props) => {

    const [isLiked, setIsLiked] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const toggleModal = () => {
        setModalIsOpen((prev) => !prev)
    };

    return (
        <div className="postCard">
            <div className="post--header">
                <img 
                    className="post--profil--picture" 
                    src={props.userProfPic} 
                    alt="user picture"
                />
                <h3 
                    className="post--username"
                >
                    {props.username}
                </h3>
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