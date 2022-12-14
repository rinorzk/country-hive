import React, { FormEvent, useState } from "react";
import { addPostComment } from "@/base/lib/comments";
import { PostComment } from "@/base/types/db";
import CommentForm from "../comment-form";
import { CommentProps } from "./types";
import styles from "./comment.module.scss";

export default function Comment({ comment, postId, userId }: CommentProps) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newReply, setNewReply] = useState("");

  function handleReplyTo() {
    setShowCommentForm(true);
  }

  function renderReply(reply: PostComment) {
    return <li key={reply.id}>{reply.content}</li>;
  }

  async function handleSubmitComment(e: FormEvent) {
    e.preventDefault();
    const newComment = {
      post_id: postId,
      content: newReply,
      creator_id: userId,
      parent_id: comment.id,
    };
    const { status } = await addPostComment(newComment);
    if (status === 201) {
      setNewReply("");
    }
  }

  return (
    <li className={styles.commentItem}>
      <div>
        <p>{comment.content}</p>
        <p onClick={handleReplyTo}>Reply</p>
      </div>
      <ul>{comment.replies?.map(renderReply)}</ul>
      {showCommentForm && (
        <CommentForm
          onSubmit={handleSubmitComment}
          newComment={newReply}
          setNewComment={setNewReply}
        />
      )}
    </li>
  );
}
