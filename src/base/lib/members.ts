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

export async function getUserByUsername(username: string) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, username")
    .eq("username", username);

  return { data, error };
}

export async function addApprovedCommunityMember(member: Member) {
  const { data, error } = await supabaseClient
    .from("community_members")
    .upsert(member, { onConflict: "member_id, community_id" })
    .select();

  return { data, error };
}

export async function getCommunityMembers(communityId: string) {
  const { data, error } = await supabaseClient
    .from("community_members")
    .select("*, member: profiles(username)")
    .eq("community_id", communityId);

  return { data, error };
}
