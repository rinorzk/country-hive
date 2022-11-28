import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { RoomMessage } from "../types/db";

export async function getRoomMessages(roomId: string) {
  const { data, error } = await supabaseClient
    .from<RoomMessage>("room_messages")
    .select("*, profile: profiles(username)")
    .eq("room_id", roomId);

  return { data, error };
}
