import { MouseEventHandler, useState } from "react";
import { dislikePost, likePost } from "@/base/lib/posts";
import { PostLikeProps } from "./types";
import styles from "./post-likes.module.scss";

export default function PostLikes({
  likes,
  isLiked,
  postId,
  userId,
}: PostLikeProps) {
  const [likesCount, setLikesCount] = useState(likes);
  const [isClicked, setIsClicked] = useState(isLiked);

  async function handleDislike() {
    const { data, error } = await dislikePost(postId, userId);
    if (data) {
      setLikesCount(likes - 1);
    }
  }

  async function handleLike() {
    const { data, error } = await likePost(postId, userId);
    if (data) {
      setLikesCount(likes + 1);
    }
  }

  function handleOnClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (isClicked) {
      handleDislike();
    } else {
      handleLike();
    }
    setIsClicked(!isClicked);
  }

  return (
    <button onClick={handleOnClick}>
      <span className={isClicked ? styles.liked : styles.disliked}>{"<3"}</span>{" "}
      {likesCount} Likes
    </button>
  );
}
