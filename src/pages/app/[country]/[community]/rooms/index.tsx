import React, { useState } from "react";
import { useRouter } from "next/router";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community, Room } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import { getCommunityServer } from "@/base/lib/community";
import { NewRoom } from "@/base/types/app";
import { addCommunityRoom, getCommunityRoomsServer } from "@/base/lib/rooms";
import NewRoomModal from "@/components/sections/new-room-modal";
import RoomList from "@/components/sections/room-list";

export default function Rooms({
  user,
  community,
  rooms,
}: {
  user: User;
  community: Community;
  rooms: Room[];
}) {
  const [communityRooms, setCommunityRooms] = useState<Room[]>(rooms);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { asPath } = useRouter();
  const communityPath = asPath.replace("/rooms", "");

  async function handleNewRoom(newRoom: NewRoom) {
    const { data, status } = await addCommunityRoom(newRoom);

    if (data?.length) setCommunityRooms((prev) => [...prev, ...data]);
  }

  return (
    <AppLayout
      title={`${community.name} - Rooms`}
      type="community"
      slug={communityPath}
    >
      <h4>Checkout rooms</h4>
      <button onClick={() => setCreateModalOpen(true)}>Create room</button>

      <RoomList rooms={communityRooms} path={asPath} userId={user.id} />

      <NewRoomModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        userId={user.id}
        communityId={community.id}
        handleNewRoom={handleNewRoom}
      />
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

      const { data: rooms } = await getCommunityRoomsServer(
        ctx,
        community[0].id
      );

      return {
        props: { ...props, community: community[0], rooms },
      };
    }

    return { props };
  },
});
