import React, { FormEvent, useState } from "react";
import { usePostComments } from "@/base/hooks/use-post-comments";
import { addPostComment } from "@/base/lib/comments";
import { PostComment } from "@/base/types/db";
import { PostCommentsProps } from "./types";
import CommentForm from "./comment-form";
import Comment from "./comment";

export default function PostComments({ postId, userId }: PostCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const { comments } = usePostComments({ postId, userId });

  function renderComment(comment: PostComment) {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        postId={postId}
        userId={userId}
      />
    );
  }

  async function handleSubmitComment(e: FormEvent) {
    e.preventDefault();
    const comment = {
      post_id: postId,
      content: newComment,
      creator_id: userId,
      parent_id: null,
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
      <CommentForm
        onSubmit={handleSubmitComment}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </div>
  );
}
