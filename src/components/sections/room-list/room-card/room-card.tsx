import React from "react";
import { Room } from "@/base/types/db";
import styles from "./room-card.module.scss";

export default function RoomCard({ title, description }: Room) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
