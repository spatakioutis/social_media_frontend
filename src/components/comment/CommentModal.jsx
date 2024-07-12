import React, { useState } from "react"
import CommentForm from "./CommentForm"
import CommentCard from "./CommentCard"
import { IoMdClose } from "react-icons/io";
import "../../styles/comments/CommentModal.css"

const CommentModal = (props) => {
    
    const commentsCards = props.comments.map((comment, index) => {
        return <CommentCard comment={comment} key={index + 1} />
    });

    return (
        <div className="modalbg">
            <div className="comment--modal">
                <div className="comment--cards">
                    {commentsCards}
                </div>
                <CommentForm 
                    postID={props.postID}
                    commentSumbit={props.commentSumbit}
                />
            </div>
            <IoMdClose 
                    className="closeModal--button"
            />
        </div>

    );
}

export default CommentModal
