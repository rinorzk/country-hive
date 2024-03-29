import React from "react";
import { useRouter } from "next/router";
import AppLayout from "@/components/layouts/app-layout";
import { useUser } from "@supabase/auth-helpers-react";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Room as RoomType } from "@/base/types/db";
import { getCommunityServer } from "@/base/lib/community";
import { getCommunityRoomServer } from "@/base/lib/rooms";
import RoomChat from "@/components/sections/room-chat";

export default function Room({ room }: { room: RoomType }) {
  const { user } = useUser();
  const { asPath } = useRouter();
  const communityPath = asPath.replace(`/rooms/${room.slug}`, "");

  return (
    <AppLayout title={room.title} type="community" slug={communityPath}>
      <h2>{room.title}</h2>
      <p>{room.description}</p>
      <RoomChat roomId={room.id} userId={user?.id} />
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
