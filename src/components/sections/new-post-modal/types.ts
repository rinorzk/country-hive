import { NewPost } from "@/base/types/db";

export type NewPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  communityId: string;
  handleNewPost: (post: NewPost) => void;
};
