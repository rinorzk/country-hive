import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { Member } from "../types/db";

export const addMemberInCommunity = async (member: Member) => {
  const { data, status } = await supabaseClient
    .from<Member>("community_members")
    .insert(member, { returning: "minimal" });

  return { data, status };
};

export const getCommunityMemberServer = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  communityId: string,
  userId: string
) => {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Member>("community_members")
    .select("*")
    .eq("community_id", communityId)
    .eq("member_id", userId);

  return { data, status };
};