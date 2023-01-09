import { useState } from "react";
import { dislikePost, likePost } from "@/base/lib/posts";
import { PostLikeProps } from "./types";
import styles from "./post-likes.module.scss";

export default function PostLikes({
  likes,
  isLiked,
  postId,
  memberId,
}: PostLikeProps) {
  const [likesCount, setLikesCount] = useState(likes);
  const [isClicked, setIsClicked] = useState(isLiked);

  async function handleDislike() {
    const { data, error } = await dislikePost(postId, memberId);
    if (data) {
      setLikesCount(likes - 1);
    }
  }

  async function handleLike() {
    const { data, error } = await likePost(postId, memberId);
    if (data) {
      setLikesCount(likes + 1);
    }
  }

  function handleOnClick() {
    if (isClicked) {
      handleDislike();
    } else {
      handleLike();
    }
    setIsClicked(!isClicked);
  }

  return (
    <button
      className={isClicked ? styles.liked : styles.disliked}
      onClick={handleOnClick}
    >
      <span>{likesCount}</span>
    </button>
  );
}
