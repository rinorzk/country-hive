import { PostComment } from "@/base/types/db";

export interface CommentProps {
  comment: PostComment;
  postId: string;
  userId: string;
}
