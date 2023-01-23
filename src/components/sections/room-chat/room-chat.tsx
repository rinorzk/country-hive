import React, { FormEvent, useState, useRef, useEffect } from "react";
import { addRoomMessage } from "@/base/lib/messages";
import { RoomMessage } from "@/base/types/db";
import { useRoomMessages } from "@/base/hooks/use-room-messages";
import { RoomChatProps } from "./types";
import Message from "./message";
import MessageFrom from "./message-form";
import styles from "./room-chat.module.scss";

export default function RoomChat({ roomId, userId }: RoomChatProps) {
  const ref = useRef<HTMLUListElement>();
  const [newMessage, setNewMessage] = useState("");
  const [messageToReply, setMessageToReply] = useState<RoomMessage>(null);
  const { messages } = useRoomMessages({ roomId, userId });

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

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
    <section className={styles.roomContainer}>
      <ul className={styles.messageHolder} ref={ref}>
        {messages.length ? messages.map(renderMessage) : null}
      </ul>
      <MessageFrom
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        messageToReply={messageToReply}
        clearReplyMessage={clearReplyMessage}
        onSubmit={handleSubmitMessage}
      />
    </section>
  );
}
