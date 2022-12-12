import React, { useState } from "react";
import CommentForm from "../comment-form";
import { CommentProps } from "./types";
import styles from "./comment.module.scss";
import { CommentFormProps } from "../comment-form/types";

export default function Comment({
  comment,
  replyTo,
  commentToReply,
  onSubmit,
  newComment,
  setNewComment,
  closeReplyComment,
}: CommentProps & CommentFormProps) {
  const [showCommentForm, setShowCommentForm] = useState(false);

  function handleReplyTo() {
    replyTo(comment);
    setShowCommentForm(true);
  }

  return (
    <li className={styles.commentItem}>
      <div>
        <p>{comment.content}</p>
        <p onClick={handleReplyTo}>Reply</p>
      </div>
      {commentToReply && showCommentForm && (
        <CommentForm
          commentToReply={commentToReply}
          onSubmit={onSubmit}
          newComment={newComment}
          setNewComment={setNewComment}
          closeReplyComment={closeReplyComment}
        />
      )}
    </li>
  );
}
