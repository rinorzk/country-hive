import React, { useState } from "react";
import moment from "moment";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community as CommunityType, Member } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import {
  addMemberInCommunity,
  getCommunityMemberServer,
} from "@/base/lib/members";
import { getCommunityServer } from "@/base/lib/community";

export default function Community({
  community,
  member,
  user,
}: {
  community: CommunityType;
  member: Member | null;
  user: User;
}) {
  const [userMember, setUserMember] = useState<Member>(member);

  const handleJoinCommunity = async () => {
    const communityMember = {
      community_id: community.id,
      member_id: user.id,
      approved: community.type === "public",
      created_at: "",
    };

    const { status } = await addMemberInCommunity(communityMember);
    if (status === 201) {
      setUserMember(communityMember);
    }
  };

  return (
    <AppLayout title={`${community.name} - Community`}>
      <h4>Community: {community.name}</h4>
      <p>Created at: {moment(community.created_at).format("DD MMM YYYY")}</p>
      <p>Created by: {community.creator_id}</p>
      {!userMember && (
        <button onClick={handleJoinCommunity}>Join Community</button>
      )}
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const communityName = ctx.params.community as string;
    const country = ctx.params.country as string;
    let props = { user };

    if (communityName) {
      const { data: community } = await getCommunityServer(
        ctx,
        communityName,
        country
      );

      const { data: member } = await getCommunityMemberServer(
        ctx,
        community[0].id,
        user.id
      );

      return {
        props: { ...props, community: community[0], member: member[0] || null },
      };
    }

    return { props };
  },
});
