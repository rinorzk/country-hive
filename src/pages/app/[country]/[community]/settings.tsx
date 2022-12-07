import React from "react";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community } from "@/base/types/db";
import { getCommunityServer } from "@/base/lib/community";
import { approveCommunityMember, getUserByUsername } from "@/base/lib/members";
import AppLayout from "@/components/layouts/app-layout";
import ApproveMember from "@/components/sections/approve-member";

export default function CommunitySettings({
  community,
  isAdmin,
}: {
  community: Community;
  isAdmin: boolean;
}) {
  async function handleApproveUser(username: string) {
    const { data, error } = await getUserByUsername(username);
    if (data.length === 0) return alert("no user found with that username");

    const newMember = {
      member_id: data[0].id,
      community_id: community.id,
      can_post: true,
      approved: true,
    };
    const { data: approved } = await approveCommunityMember(newMember);
  }

  return (
    <AppLayout title={`${community.name} - Community`}>
      <h4>Community: {community.name}</h4>
      <ApproveMember onSubmit={handleApproveUser} />
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const communitySlug = ctx.params.community as string;
    const country = ctx.params.country as string;
    let props = { user };

    if (communitySlug) {
      const { data: community } = await getCommunityServer(
        ctx,
        communitySlug,
        country
      );

      const isAdmin = community[0].creator_id === user.id;

      return {
        props: { ...props, community: community[0], isAdmin },
      };
    }

    return { props };
  },
});
