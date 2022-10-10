import React, { useState } from "react";
import moment from "moment";
import {
  getUser,
  supabaseClient,
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { Community as CommunityType, Member } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";

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
    const { data, status } = await supabaseClient
      .from<Member>("community_members")
      .insert(
        {
          community_id: community.id,
          member_id: user.id,
          approved: community.type === "public",
        },
        { returning: "minimal" }
      );
    if (status === 201) {
      setUserMember({
        community_id: community.id,
        member_id: user.id,
        approved: community.type === "public",
        created_at: "",
      });
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
      const { body: community } = await supabaseServerClient(ctx)
        .from<CommunityType>("communities")
        .select("*")
        .eq("name", communityName)
        .eq("country", country);

      const { body: member } = await supabaseServerClient(ctx)
        .from<Member>("community_members")
        .select("*")
        .eq("community_id", community[0].id)
        .eq("member_id", user.id);

      return {
        props: { ...props, community: community[0], member: member[0] || null },
      };
    }

    return { props };
  },
});
