import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io";
import {useState} from 'react'
import '../../styles/comments/CommentCard.css'

const CommentCard = ({comment}) => {

    const [isLiked, setIsLiked] = useState(false)

    return (
        <div className="comment--card">            
            <div className="comment--header">
                <img 
                    className="comment--profil--picture" 
                    src={comment.userProfPic} 
                    alt="user picture"
                />
                <h3 
                    className="comment--username"
                >
                    {comment.username}
                </h3>
                <div className='comment--likes'>
                    {isLiked ? 
                        <IoIosHeart className="comment--likeButton"
                                    color="red"
                                    onClick={() => { setIsLiked(prev => !prev)}}
                        /> :
                        <IoIosHeartEmpty className="comment--likeButton"
                                        onClick={() => { setIsLiked(prev => !prev)}}
                        /> }
                        {comment.likeCount !== 0 && 
                            <h5 className='comment--likeCount'> {comment.likeCount}</h5>
                        }
                </div>
            </div>
            <p className="comment--text">{comment.text}</p>
        </div>
    )
}

export default CommentCard