import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { NewRoom, ServerSidePropsCtx } from "@/base/types/app";
import { Room } from "@/base/types/db";

export const getCommunityRoomsServer = async (
  ctx: ServerSidePropsCtx,
  communityId: string
) => {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Room>("rooms")
    .select("title, id, slug")
    .eq("community_id", communityId);

  return { data, status };
};

export const addCommunityRoom = async (room: NewRoom) => {
  const { data, status } = await supabaseClient.from<Room>("room").insert(room);

  return { data, status };
};

export const getCommunityRoomServer = async (
  ctx: ServerSidePropsCtx,
  communityId: string,
  roomSlug: string
) => {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Room>("rooms")
    .select("*")
    .eq("community_id", communityId)
    .eq("slug", roomSlug);

  return { data, status };
};
