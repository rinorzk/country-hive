import React from "react";
import { MessageProps } from "./types";
import styles from "./message.module.scss";

export default function Message(props: MessageProps) {
  const { message, replyTo } = props;

  function handleReplyTo() {
    replyTo(message);
  }

  return (
    <li className={styles.message}>
      {message?.content} <span onClick={handleReplyTo}>reply</span>
    </li>
  );
}
