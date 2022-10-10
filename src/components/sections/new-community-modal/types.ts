import { Community } from "@/base/types/db";

export type NewCommunityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  country: string;
  handleNewCommunity: (community: Community) => void;
};
