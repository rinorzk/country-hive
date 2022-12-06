import React from "react";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";
import { Community } from "@/base/types/db";
import { getCommunityServer } from "@/base/lib/community";

export default function CommunitySettings({
  community,
  isAdmin,
}: {
  community: Community;
  isAdmin: boolean;
}) {
  return (
    <AppLayout title={`${community.name} - Community`}>
      <h4>Community: {community.name}</h4>
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
