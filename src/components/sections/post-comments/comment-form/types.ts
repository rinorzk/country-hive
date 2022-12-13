import { FormEvent } from "react";

export interface CommentFormProps {
  onSubmit: (e: FormEvent) => Promise<void>;
  newComment: string;
  setNewComment: (value: React.SetStateAction<string>) => void;
}
