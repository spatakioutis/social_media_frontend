import React, { useState } from "react"
import CommentForm from "./CommentForm"
import CommentCard from "./CommentCard"
import { IoMdClose } from "react-icons/io";
import "../../styles/CommentModal.css"

function CommentModal(props) {
    
    const commentsCards = props.comments.map((comment, index) => {
        return <CommentCard comment={comment} key={index + 1} />
    });

    return (
        <div className="modalbg">
            <div className="comment--modal">
                <div className="comment--cards">
                    {commentsCards}
                </div>
                <CommentForm />
            </div>
            <IoMdClose className="closeModal--button"
                       onClick={props.toggleModal}
            />
        </div>

    );
}

export default CommentModal
