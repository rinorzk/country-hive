import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { Post } from "../types/db";

export const getCommunityPostsServer = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  communityId: string
) => {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Post>("posts")
    .select("title, id")
    .eq("community_id", communityId);

  return { data, status };
};
