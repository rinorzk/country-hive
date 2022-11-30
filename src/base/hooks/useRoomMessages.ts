import { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { RoomChatProps } from "@/components/sections/room-chat/types";
import { RoomMessage } from "../types/db";
import { getRoomMessages } from "../lib/messages";

export function useRoomMessages({ roomId, userId }: RoomChatProps) {
  const [messages, setMessages] = useState<RoomMessage[]>([]);

  async function getRoomMessagesData() {
    const { data, error } = await getRoomMessages(roomId);

    if (!error) {
      setMessages(data);
    }
  }

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

  useEffect(() => {
    if (roomId) {
      getRoomMessagesData();
    }
  }, [roomId]);

  return {
    messages,
  };
}
