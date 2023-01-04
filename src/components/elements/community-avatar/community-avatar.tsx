import React from "react";
import Image from "next/image";
import { CommunityAvatarProps } from "./types";
import styles from "./community-avatar.module.scss";

export default function CommunityAvatar({ src, alt }: CommunityAvatarProps) {
  return (
    <div className={styles.avatarHolder}>
      <Image src={src} alt={alt} className={styles.avatar} fill />
    </div>
  );
}
