import { NewRoom } from "@/base/types/app";

export type NewRoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  communityId: string;
  handleNewRoom: (room: NewRoom) => void;
};
