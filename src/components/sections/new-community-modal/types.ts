export type NewCommunityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  country: string;
  handleNewCommunity: (community) => void
};
