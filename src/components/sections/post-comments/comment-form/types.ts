import { FormEvent } from "react";
import { PostComment } from "@/base/types/db";

export interface CommentFormProps {
  onSubmit: (e: FormEvent) => Promise<void>;
  newComment: string;
  setNewComment: (value: React.SetStateAction<string>) => void;
  commentToReply: PostComment;
  closeReplyComment: () => void;
}
