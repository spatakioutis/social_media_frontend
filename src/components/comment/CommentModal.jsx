import React, { useState, useEffect } from "react"
import CommentForm from "./CommentForm"
import CommentCard from "./CommentCard"
import { IoMdClose } from "react-icons/io"
import "../../styles/comments/CommentModal.css"
import { useAxios } from "../../hooks/AxiosInterceptor"

const CommentModal = (props) => {

    const axiosInstance = useAxios()
    const [comments, setComments] = useState([])
    const [commentAdded, setCommentAdded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            try {
                const response = await axiosInstance.get(`http://localhost:5000/comments?postID=${props.postID}`)
                setComments(response.data.comments)
            }
            catch (error) {
                console.log('Error fetching comments:', error)
            }
            setLoading(false)
        }
        fetchComments()
    }, [commentAdded])

    const handleCommentDelete = (commentID) => {
        setComments((prevComments) => 
            prevComments.filter(comment => comment._id !== commentID)
        )
    }
    
    const commentsCards = comments.map((comment, index) => {
        return <CommentCard 
                    comment={comment} 
                    key={index + 1} 
                    deleteComment={handleCommentDelete}
                />
    })

    return (
        <div className="modalbg">
            <div className="comment--modal">
                <div className="comment--cards">
                    { commentsCards.length > 0 ? 
                    commentsCards :
                    <div className="no--comments--card">
                        No comments yet. Be the first!
                    </div>
                    }
                    {loading && <p>Loading...</p>}
                </div>
                <CommentForm 
                    postID={props.postID}
                    refreshTrigger={setCommentAdded}
                />
            </div>
            <IoMdClose 
                    className="closeModal--button"
                    onClick={props.toggleModal}
            />
        </div>

    )
}

export default CommentModal
