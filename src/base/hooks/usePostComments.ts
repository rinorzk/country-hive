import { useState, useEffect } from "react";
import { PostCommentsProps } from "@/components/sections/post-comments/types";
import { PostComment } from "../types/db";
import { getPostComments } from "../lib/comments";

export function usePostComments({ postId, userId }: PostCommentsProps) {
  const [comments, setComments] = useState<PostComment[]>([]);

  async function getRoomMessagesData() {
    const { data, error } = await getPostComments(postId);

    if (!error) {
      setComments(data);
    }
  }

  useEffect(() => {
    if (postId) {
      getRoomMessagesData();
    }
  }, [postId]);

  return {
    comments,
  };
}
