import React, { FormEvent, useState } from "react";
import { usePostComments } from "@/base/hooks/usePostComments";
import { addPostComment } from "@/base/lib/comments";
import { PostComment } from "@/base/types/db";
import { PostCommentsProps } from "./types";

export default function PostComments({ postId, userId }: PostCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const { comments } = usePostComments({ postId, userId });

  function renderComment(comment: PostComment) {
    return <li key={comment.id}>{comment.content}</li>;
  }

  async function onSubmitMessage(e: FormEvent) {
    e.preventDefault();
    const comment = {
      post_id: postId,
      content: newComment,
      creator_id: userId,
    };
    const { status } = await addPostComment(comment);
    if (status === 201) {
      setNewComment("");
    }
  }

  return (
    <div>
      POST COMMENTS
      <ul>{comments.length ? comments.map(renderComment) : null}</ul>
      <form onSubmit={onSubmitMessage}>
        <input
          type="text"
          name="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </form>
    </div>
  );
}
