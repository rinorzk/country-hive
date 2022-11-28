import { getRoomMessages } from "@/base/lib/messages";
import { RoomMessage } from "@/base/types/db";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useEffect, useState } from "react";
import { RoomChatProps } from "./types";

export default function RoomChat({ roomId, userId }: RoomChatProps) {
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  async function getRoomMessagesData() {
    const { data, error } = await getRoomMessages(roomId);

    if (!error) {
      setMessages(data);
    }
  }

  useEffect(() => {
    getRoomMessagesData();
  }, []);

  useEffect(() => {
    const subscription = supabaseClient
      .from<RoomMessage>("room_messages")
      .on("INSERT", (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(subscription);
    };
  }, []);

  function renderMessage(message: RoomMessage) {
    return <li>{message.content}</li>;
  }

  async function onSubmitMessage(e: FormEvent) {
    e.preventDefault();
    const { data, status } = await supabaseClient
      .from<RoomMessage>("room_messages")
      .insert({ room_id: roomId, content: newMessage, creator_id: userId });

    if (status === 201) {
      setNewMessage("");
    }
  }

  return (
    <div>
      ROOM CHAT
      <ul>{messages.length ? messages.map(renderMessage) : null}</ul>
      <form onSubmit={onSubmitMessage}>
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
