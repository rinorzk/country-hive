import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NewPostComment } from "../types/app";
import { PostComment } from "../types/db";

export async function getPostComments(postId: string) {
  const { data, error } = await supabaseClient
    .from<PostComment>("post_comments")
    .select("*, profile: profiles(username), replyOf: parent_id(content)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return { data, error };
}

export async function addPostComment(newComment: NewPostComment) {
  const { data, status } = await supabaseClient
    .from<PostComment>("post_comments")
    .insert(newComment);

  return { data, status };
}

export async function getPostCommentsWithReplies(postId: string) {
  const { data, error } = await supabaseClient
    .rpc("get_comments_with_replies", { post_id: postId })
    .select();

  return { data, error };
}
