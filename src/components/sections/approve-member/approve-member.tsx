import { useCommunityMembers } from "@/base/hooks/useCommunityMembers";
import { Member } from "@/base/types/db";
import React, { useState } from "react";
import { ApproveMemberProps } from "./types";

export default function ApproveMembers({
  onSubmit,
  communityId,
  userId,
}: ApproveMemberProps) {
  const [username, setUsername] = useState("");
  const { members } = useCommunityMembers({ communityId, userId });

  function renderMember(member: Member) {
    return <li>{member.member?.username}</li>;
  }

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
          placeholder="add new user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Add user</button>
      </form>
      <ul>{members.length ? members.map(renderMember) : null}</ul>
    </div>
  );
}
