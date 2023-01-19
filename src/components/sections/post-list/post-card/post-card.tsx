import React from "react";
import { Post } from "@/base/types/db";
import styles from "./post-card.module.scss";
import PostLikes from "@/components/modules/post-likes";

export default function PostCard(post: Post) {
  return (
    <div className={styles.post}>
      <h3>{post.title}</h3>
      <PostLikes
        postId={post.id}
        likes={post.likes}
        memberId={""}
        isLiked={post.is_liked}
      />
    </div>
  );
}
