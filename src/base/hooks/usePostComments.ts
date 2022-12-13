import { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";
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

  function isParentOfReply(comment: PostComment, reply: PostComment) {
    return comment.id === reply.parent_id;
  }

  function insertReply(comments: PostComment[], newReply: PostComment) {
    return comments.map((cm) => {
      if (isParentOfReply(cm, newReply)) {
        return {
          ...cm,
          replies: [...cm.replies, newReply],
        };
      }
      return cm;
    });
  }

  function handleNewComment(payload: SupabaseRealtimePayload<PostComment>) {
    if (payload.new.parent_id) {
      return setComments((prev) => insertReply(prev, payload.new));
    }
    setComments((prev) => [...prev, payload.new]);
  }

  useEffect(() => {
    const subscription = supabaseClient
      .from<PostComment>("post_comments")
      .on("INSERT", handleNewComment)
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
