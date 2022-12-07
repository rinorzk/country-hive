import React, { useState } from "react";
import { ApproveMemberProps } from "./types";

export default function ApproveMembers({ onSubmit }: ApproveMemberProps) {
  const [username, setUsername] = useState("");

  function handleApproveMember(e: React.FormEvent<Element>) {
    e.preventDefault();
    onSubmit(username);
  }

  return (
    <div>
      <form onSubmit={handleApproveMember}>
        <input
          type="text"
          name="approve-user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Add user</button>
      </form>
    </div>
  );
}
