import React from "react";
import CommunityAvatar from "@/components/elements/community-avatar";
import CommunityCover from "@/components/elements/community-cover";
import { CommunityHeroProps } from "./types";
import styles from "./community-hero.module.scss";

export default function CommunityCoverUpload({
  cover_url,
  avatar_url,
  name,
}: CommunityHeroProps) {
  return (
    <div className={styles.communityHero}>
      {cover_url ? <CommunityCover src={cover_url} alt={name} /> : null}
      <div className={styles.avatarHolder}>
        {avatar_url ? <CommunityAvatar src={avatar_url} alt={name} /> : null}
      </div>
      <h1 className={styles.communityName}>{name}</h1>
    </div>
  );
}
