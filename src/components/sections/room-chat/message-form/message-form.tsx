import React from "react";
import { MessageFormProps } from "./types";

export default function MessageFrom({
  onSubmit,
  newMessage,
  setNewMessage,
  messageToReply,
  clearReplyMessage,
}: MessageFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {messageToReply ? (
        <p>
          &#8594; {messageToReply.content}{" "}
          <span onClick={clearReplyMessage}>x</span>
        </p>
      ) : null}
      <input
        type="text"
        name="message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
    </form>
  );
}
