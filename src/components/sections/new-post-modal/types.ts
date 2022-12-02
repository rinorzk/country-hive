import { NewPost } from "@/base/types/app";

export interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  communityId: string;
  handleNewPost: (post: NewPost) => void;
}
