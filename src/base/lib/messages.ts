import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NewRoomMessage } from "../types/app";
import { RoomMessage } from "../types/db";

export async function getRoomMessages(roomId: string) {
  const { data, error } = await supabaseClient
    .from<RoomMessage>("room_messages")
    .select("*, profile: profiles(username), replyOf: reply_id(content)")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  return { data, error };
}

export async function addRoomMessage(newMessage: NewRoomMessage) {
  const { data, status } = await supabaseClient
    .from<RoomMessage>("room_messages")
    .insert(newMessage);

  return { data, status };
}
