import React from "react";
import { CommentFormProps } from "./types";

export default function CommentForm({
  onSubmit,
  newComment,
  setNewComment,
}: CommentFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment"
      />
    </form>
  );
}
