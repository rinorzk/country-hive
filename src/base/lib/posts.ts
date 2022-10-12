import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { Post } from "../types/db";
import { NewPost, ServerSidePropsCtx } from "../types/app";

export const getCommunityPostsServer = async (
  ctx: ServerSidePropsCtx,
  communityId: string
) => {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Post>("posts")
    .select("title, id")
    .eq("community_id", communityId);

  return { data, status };
};

export const addCommunityPost = async (post: NewPost) => {
  const { data, status } = await supabaseClient
    .from<Post>("posts")
    .insert(post);

  return { data, status };
};
