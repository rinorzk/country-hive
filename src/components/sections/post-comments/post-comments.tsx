import React, { FormEvent, useState } from "react";
import { usePostComments } from "@/base/hooks/usePostComments";
import { addPostComment } from "@/base/lib/comments";
import { PostComment } from "@/base/types/db";
import { PostCommentsProps } from "./types";
import CommentForm from "./comment-form";
import Comment from "./comment";

export default function PostComments({ postId, userId }: PostCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [commentToReply, setCommentToReply] = useState<PostComment>(null);
  const { comments } = usePostComments({ postId, userId });

  function renderComment(comment: PostComment) {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        replyTo={setCommentToReply}
        commentToReply={commentToReply}
        onSubmit={handleSubmitComment}
        newComment={newComment}
        setNewComment={setNewComment}
        closeReplyComment={clearReplyComment}
      />
    );
  }

  async function handleSubmitComment(e: FormEvent) {
    e.preventDefault();
    const comment = {
      post_id: postId,
      content: newComment,
      creator_id: userId,
      parent_id: commentToReply.id,
    };
    const { status } = await addPostComment(comment);
    if (status === 201) {
      setNewComment("");
    }
  }

  function clearReplyComment() {
    setCommentToReply(null);
  }

  return (
    <div>
      POST COMMENTS
      <ul>{comments.length ? comments.map(renderComment) : null}</ul>
      <CommentForm
        onSubmit={handleSubmitComment}
        newComment={newComment}
        setNewComment={setNewComment}
        commentToReply={commentToReply}
        closeReplyComment={clearReplyComment}
      />
    </div>
  );
}
