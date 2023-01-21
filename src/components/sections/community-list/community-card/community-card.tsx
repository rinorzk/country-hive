import React from "react";
import Image from "next/image";
import { Community } from "@/base/types/db";
import styles from "./community-card.module.scss";
import CommunityCover from "@/components/elements/community-cover";

export default function CommunityCard({
  name,
  description,
  avatar_url,
  cover_url,
}: Community) {
  return (
    <div className={styles.card}>
      <div className={styles.coverHolder}>
        {cover_url ? <CommunityCover src={cover_url} alt={name} /> : null}
      </div>
      <div className={styles.avatarHolder}>
        {avatar_url ? (
          <Image src={avatar_url} alt={name} width={70} height={70} />
        ) : null}
      </div>
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
