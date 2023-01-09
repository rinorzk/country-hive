import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { Post, PostLikes } from "../types/db";
import { NewPost, ServerSidePropsCtx } from "../types/app";

export async function getCommunityPostsServer(
  ctx: ServerSidePropsCtx,
  communityId: string
) {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Post>("posts")
    .select("title, id, slug, likes:post_likes(count)")
    .eq("community_id", communityId);

  return { data, status };
}

export async function getCommunityPostsWithLikesServer(
  ctx: ServerSidePropsCtx,
  communityId: string,
  userId: string
) {
  const { data, error } = await supabaseServerClient(ctx)
    .rpc("get_posts_with_likes", {
      community_id: communityId,
      member_id: userId,
    })
    .select();

  return { data, error };
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

export async function getCommunityPostWithLikesServer(
  ctx: ServerSidePropsCtx,
  communityId: string,
  postSlug: string,
  userId: string
) {
  const { data, status } = await supabaseServerClient(ctx)
    .rpc("get_post_with_likes", {
      community_id: communityId,
      post_slug: postSlug,
      member_id: userId,
    })
    .select();

  return { data, status };
}

export async function likePost(postId: string, memberId: string) {
  const { data, error } = await supabaseClient
    .from<PostLikes>("post_likes")
    .insert({ post_id: postId, member_id: memberId });

  return { data, error };
}

export async function dislikePost(postId: string, memberId: string) {
  const { data, error } = await supabaseClient
    .from<PostLikes>("post_likes")
    .delete()
    .eq("post_id", postId)
    .eq("member_id", memberId);

  return { data, error };
}
