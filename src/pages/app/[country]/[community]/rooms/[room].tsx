import React from "react";
import AppLayout from "@/components/layouts/app-layout";
import { Room as RoomType } from "@/base/types/db";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { getCommunityServer } from "@/base/lib/community";
import { getCommunityRoomServer } from "@/base/lib/rooms";

export default function Room({ room }: { room: RoomType }) {
  return (
    <AppLayout>
      <h4>{room.title}</h4>
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    let props = { user };
    const country = ctx.params.country as string;
    const communitySlug = ctx.params.community as string;
    const roomSlug = ctx.params.room as string;

    if (communitySlug) {
      const { data: community } = await getCommunityServer(
        ctx,
        communitySlug,
        country
      );

      const { data: room } = await getCommunityRoomServer(
        ctx,
        community[0].id,
        roomSlug
      );

      return {
        props: { ...props, community: community[0], room: room[0] || null },
      };
    }

    return { props };
  },
});
