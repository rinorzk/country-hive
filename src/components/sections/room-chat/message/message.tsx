import React from "react";
import { MessageProps } from "./types";
import styles from "./message.module.scss";

export default function Message(props: MessageProps) {
  const { message, replyTo } = props;

  function handleReplyTo() {
    replyTo(message);
  }

  return (
    <li className={styles.messageItem}>
      {message.replyOf ? (
        <small className={styles.messageReply}>
          &#8594; {message.replyOf?.content}
        </small>
      ) : null}
      <div className={styles.messageContent}>
        <p>{message.content}</p>
        <span className={styles.replyBtn} onClick={handleReplyTo}>
          reply
        </span>
      </div>
    </li>
  );
}
