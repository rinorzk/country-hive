import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { Member } from "../types/db";
import { ServerSidePropsCtx } from "../types/app";

export async function addMemberInCommunity(member: Member) {
  const { data, status } = await supabaseClient
    .from<Member>("community_members")
    .insert(member, { returning: "minimal" });

  return { data, status };
}

export async function getCommunityMemberServer(
  ctx: ServerSidePropsCtx,
  communityId: string,
  userId: string
) {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Member>("community_members")
    .select("*")
    .eq("community_id", communityId)
    .eq("member_id", userId);

  return { data, status };
}
