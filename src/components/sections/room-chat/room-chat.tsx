import React, { FormEvent, useState } from "react";
import { addRoomMessage } from "@/base/lib/messages";
import { RoomMessage } from "@/base/types/db";
import { useRoomMessages } from "@/base/hooks/useRoomMessages";
import { RoomChatProps } from "./types";
import Message from "./message";

export default function RoomChat({ roomId, userId }: RoomChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messageToReply, setMessageToReply] = useState<RoomMessage>(null);
  const { messages } = useRoomMessages({ roomId, userId });

  function renderMessage(message: RoomMessage) {
    return (
      <Message key={message.id} message={message} replyTo={setMessageToReply} />
    );
  }

  async function onSubmitMessage(e: FormEvent) {
    e.preventDefault();
    const message = {
      room_id: roomId,
      content: newMessage,
      creator_id: userId,
    };
    const { status } = await addRoomMessage(message);
    if (status === 201) {
      setNewMessage("");
    }
  }

  function clearReplyMessage() {
    setMessageToReply(null);
  }

  return (
    <div>
      ROOM CHAT
      <ul>{messages.length ? messages.map(renderMessage) : null}</ul>
      <form onSubmit={onSubmitMessage}>
        {messageToReply ? (
          <p>
            &#8594; {messageToReply.content}{" "}
            <span onClick={clearReplyMessage}>x</span>
          </p>
        ) : null}
        <input
          type="text"
          name="message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
