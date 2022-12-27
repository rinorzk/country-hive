import { useState, useEffect } from "react";
import { Member } from "../types/db";
import { getCommunityMembers } from "../lib/members";

export function useCommunityMembers({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) {
  const [members, setMembers] = useState<Member[]>([]);

  async function getPostCommentsData() {
    const { data, error } = await getCommunityMembers(communityId);

    if (!error) {
      setMembers(data);
    }
  }

  useEffect(() => {
    if (communityId) {
      getPostCommentsData();
    }
  }, [communityId, userId]);

  return {
    members,
  };
}
