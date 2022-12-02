import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { Post } from "../types/db";
import { NewPost, ServerSidePropsCtx } from "../types/app";

export async function getCommunityPostsServer(
  ctx: ServerSidePropsCtx,
  communityId: string
) {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Post>("posts")
    .select("title, id, slug")
    .eq("community_id", communityId);

  return { data, status };
}

export async function addCommunityPost(post: NewPost) {
  const { data, status } = await supabaseClient
    .from<Post>("posts")
    .insert(post);

  return { data, status };
}

export async function getCommunityPostServer(
  ctx: ServerSidePropsCtx,
  communityId: string,
  postSlug: string
) {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Post>("posts")
    .select("*")
    .eq("community_id", communityId)
    .eq("slug", postSlug);

  return { data, status };
}
