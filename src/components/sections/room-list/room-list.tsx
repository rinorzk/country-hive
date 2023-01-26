import React from "react";
import Link from "next/link";
import { Room } from "@/base/types/db";
import { RoomListProps } from "./types";
import styles from "./room-list.module.scss";
import RoomCard from "./room-card";

export default function RoomList({ rooms, path, userId }: RoomListProps) {
  function renderRoomLink(room: Room) {
    return (
      <li key={room.id}>
        <Link key={room.id} href={`${path}/${room.slug}`}>
          <RoomCard {...room} />
        </Link>
      </li>
    );
  }

  return (
    <section>
      <ul className={styles.roomList}>{rooms?.map(renderRoomLink)}</ul>
    </section>
  );
}
