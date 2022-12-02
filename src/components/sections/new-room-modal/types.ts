import { NewRoom } from "@/base/types/app";

export interface NewRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  communityId: string;
  handleNewRoom: (room: NewRoom) => void;
}
