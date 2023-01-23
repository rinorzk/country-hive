import React from "react";
import { MessageFormProps } from "./types";
import styles from "./message-form.module.scss";

export default function MessageFrom({
  onSubmit,
  newMessage,
  setNewMessage,
  messageToReply,
  clearReplyMessage,
}: MessageFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.messageForm}>
      {messageToReply ? (
        <p className={styles.toReply}>
          &#8594; {messageToReply.content}{" "}
          <span onClick={clearReplyMessage}>x</span>
        </p>
      ) : null}
      <input
        type="text"
        name="message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className={styles.input}
        placeholder="Message in room"
      />
    </form>
  );
}
