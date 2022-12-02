import { RoomMessage } from "@/base/types/db";

export interface MessageProps {
  message: RoomMessage;
  replyTo: React.Dispatch<React.SetStateAction<RoomMessage>>;
}
