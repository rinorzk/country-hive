import React from "react";
import Link from "next/link";
import { Post } from "@/base/types/db";
import { PostListProps } from "./types";
import styles from "./post-list.module.scss";
import PostCard from "./post-card";

export default function PostList({ posts, path, userId }: PostListProps) {
  function renderPostLink(post: Post) {
    return (
      <li key={post.id}>
        <Link href={`${path}/${post.slug}`}>
          <PostCard post={post} userId={userId} />
        </Link>
      </li>
    );
  }

  return (
    <section>
      <ul className={styles.postList}>{posts?.map(renderPostLink)}</ul>
    </section>
  );
}
