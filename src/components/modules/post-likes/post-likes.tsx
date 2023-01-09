import { useState } from "react";
import { PostLikeProps } from "./types";
import styles from "./post-likes.module.scss";

export default function PostLikes({ likes, isLiked, onClick }: PostLikeProps) {
  const [likesCount, setLikesCount] = useState(likes);
  const [isClicked, setIsClicked] = useState(isLiked);

  function handleOnClick() {
    if (isClicked) {
      setLikesCount(likes - 1);
    } else {
      setLikesCount(likes + 1);
    }
    setIsClicked(!isClicked);
    onClick(!isClicked);
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
