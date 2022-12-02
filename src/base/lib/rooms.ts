import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { NewRoom, ServerSidePropsCtx } from "@/base/types/app";
import { Room } from "@/base/types/db";

export async function getCommunityRoomsServer(
  ctx: ServerSidePropsCtx,
  communityId: string
) {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Room>("rooms")
    .select("title, id, slug")
    .eq("community_id", communityId);

  return { data, status };
}

export async function addCommunityRoom(room: NewRoom) {
  const { data, status } = await supabaseClient
    .from<Room>("rooms")
    .insert(room);

  return { data, status };
}

export async function getCommunityRoomServer(
  ctx: ServerSidePropsCtx,
  communityId: string,
  roomSlug: string
) {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Room>("rooms")
    .select("*")
    .eq("community_id", communityId)
    .eq("slug", roomSlug);

  return { data, status };
}
