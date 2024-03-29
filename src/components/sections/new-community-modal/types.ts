import { NewCommunity } from "@/base/types/app";

export interface NewCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  country: string;
  handleNewCommunity: (community: NewCommunity) => void;
}
