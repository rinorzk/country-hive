import React from "react";
import Image from "next/image";
import { CommunityCoverProps } from "./types";
import styles from "./community-cover.module.scss";

export default function CommunityCover({ src, alt }: CommunityCoverProps) {
  return (
    <div className={styles.coverHolder}>
      <Image src={src} alt={alt} className={styles.cover} fill />
    </div>
  );
}
