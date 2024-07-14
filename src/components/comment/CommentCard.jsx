import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {useState, useEffect} from 'react'
import '../../styles/comments/CommentCard.css'
import { useAuth } from "../../hooks/AuthProvider"
import { useNavigate } from "react-router-dom"
import { useAxios } from "../../hooks/AxiosInterceptor"

const CommentCard = (props) => {

    const axiosInstance = useAxios()
    const navigate = useNavigate()
    const auth = useAuth()
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(props.comment.likes.length)

    const goToProfile = () => {
        navigate('/user', {state: {username: props.comment.username}})
    }

    const handleCommentDelete = async () => {
        try {
            await axiosInstance.delete(`http://localhost:5000/comments?postID=${props.comment.postID}&commentID=${props.comment._id}`)
            props.deleteComment(props.comment._id)
        }
        catch (error) {
            console.log(error)
        }
    }

    const likeComment = async () => {
        try {
            await axiosInstance.post(`http://localhost:5000/comments/likes`, {
                commentID: props.comment._id
            })
            setIsLiked(true)
            setLikeCount(prevCount => prevCount + 1)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteLikeFromComment = async () => {
        try {
            await axiosInstance.delete(`http://localhost:5000/comments/likes?commentID=${props.comment._id}`)
            setIsLiked(false)
            setLikeCount(prevCount => prevCount - 1)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (props.comment.likes.some( like => like && like.toString() === auth.user.userID.toString()) ) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [props.comment.likes, auth.user.username])

    return (
        <div className="comment--card">            
            <div className="comment--header" onClick={goToProfile}>
                <img 
                    className="comment--profil--picture" 
                    src={props.comment.profilePic} 
                    alt="user picture"
                />
                <h3 
                    className="comment--username"
                >
                    {props.comment.username}
                </h3>
            </div>
            <div className='comment--likes'>
                {isLiked ? 
                    <IoIosHeart className="comment--likeButton"
                                color="red"
                                onClick={deleteLikeFromComment}
                    /> :
                    <IoIosHeartEmpty className="comment--likeButton"
                                    onClick={likeComment}
                    /> }
                    {/* {likeCount !== 0 &&  */}
                        <h5 className='comment--likeCount'>{likeCount}</h5>
                    
            </div> 
            <p className="comment--text">{props.comment.text}</p>
            <DeleteForeverIcon 
                    className="delete--comment--icon"
                    sx={{fontSize: '1.2rem'}}
                    onClick={handleCommentDelete}
            /> 
            
        </div>
    )
}

export default CommentCard