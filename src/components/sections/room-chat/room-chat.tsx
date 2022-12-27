import React, { FormEvent, useState } from "react";
import { addRoomMessage } from "@/base/lib/messages";
import { RoomMessage } from "@/base/types/db";
import { useRoomMessages } from "@/base/hooks/use-room-messages";
import { RoomChatProps } from "./types";
import Message from "./message";
import MessageFrom from "./message-form";

export default function RoomChat({ roomId, userId }: RoomChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messageToReply, setMessageToReply] = useState<RoomMessage>(null);
  const { messages } = useRoomMessages({ roomId, userId });

  function renderMessage(message: RoomMessage) {
    return (
      <Message key={message.id} message={message} replyTo={setMessageToReply} />
    );
  }

  async function handleSubmitMessage(e: FormEvent) {
    e.preventDefault();
    const message = {
      room_id: roomId,
      content: newMessage,
      creator_id: userId,
      reply_id: messageToReply?.id,
    };
    const { status } = await addRoomMessage(message);
    if (status === 201) {
      setNewMessage("");
      clearReplyMessage();
    }
  }

  function clearReplyMessage() {
    setMessageToReply(null);
  }

  return (
    <div>
      <h3>ROOM CHAT</h3>
      <ul>{messages.length ? messages.map(renderMessage) : null}</ul>
      <MessageFrom
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        messageToReply={messageToReply}
        clearReplyMessage={clearReplyMessage}
        onSubmit={handleSubmitMessage}
      />
    </div>
  );
}
