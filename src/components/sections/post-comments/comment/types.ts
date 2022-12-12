import { PostComment } from "@/base/types/db";

export interface CommentProps {
  comment: PostComment;
  replyTo: React.Dispatch<React.SetStateAction<PostComment>>;
  commentToReply: PostComment;
}
