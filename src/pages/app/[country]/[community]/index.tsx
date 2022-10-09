import React from "react";
import moment from "moment";
import {
  getUser,
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { Community as CommunityType, Member } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";

export default function Community({
  community,
  member,
}: {
  community: CommunityType;
}) {
  console.log("member", member);

  const handleJoinCommunity = async () => {
    const { data, status } = await supabaseClient
      .from<Member>("community_members")
      .insert({}, { returning: "minimal" });
    console.log("TEST");
  };

  return (
    <AppLayout title={`${community.name} - Community`}>
      <h4>Community: {community.name}</h4>
      <p>Created at: {moment(community.created_at).format("DD MMM YYYY")}</p>
      <p>Created by: {community.creator_id}</p>
      <button onClick={handleJoinCommunity}>Join Community</button>
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

      console.log("community[0].id", community[0].id);
      console.log("user.id", user.id);

      return {
        props: { ...props, community: community[0], member: member[0] },
      };
    }

    return { props };
  },
});
