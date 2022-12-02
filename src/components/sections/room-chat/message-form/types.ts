import { RoomMessage } from "@/base/types/db";
import type { FormEvent } from "react";

export interface MessageFormProps {
  onSubmit: (e: FormEvent) => Promise<void>;
  newMessage: string;
  setNewMessage: (value: React.SetStateAction<string>) => void;
  messageToReply: RoomMessage;
  clearReplyMessage: () => void;
}
