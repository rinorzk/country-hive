import { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostCommentsProps } from "@/components/sections/post-comments/types";
import { PostComment } from "../types/db";
import { getPostCommentsWithReplies } from "../lib/comments";

export function usePostComments({ postId, userId }: PostCommentsProps) {
  const [comments, setComments] = useState<PostComment[]>([]);

  async function getPostCommentsData() {
    const { data, error } = await getPostCommentsWithReplies(postId);

    if (!error) {
      setComments(data);
    }
  }

  useEffect(() => {
    const subscription = supabaseClient
      .from<PostComment>("post_comments")
      .on("INSERT", (payload) => {
        setComments((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(subscription);
    };
  }, []);

  useEffect(() => {
    if (postId) {
      getPostCommentsData();
    }
  }, [postId, userId]);

  return {
    comments,
  };
}
