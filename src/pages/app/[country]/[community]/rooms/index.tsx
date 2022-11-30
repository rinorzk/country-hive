import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community, Post, Room } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import { getCommunityServer } from "@/base/lib/community";
import { NewRoom } from "@/base/types/app";
import { addCommunityRoom, getCommunityRoomsServer } from "@/base/lib/rooms";
import NewRoomModal from "@/components/sections/new-room-modal";

export default function Rooms({
  user,
  community,
  rooms,
}: {
  user: User;
  community: Community;
  rooms: Room[];
}) {
  const [communityRooms, setCommunityRooms] = useState<Post[]>(rooms);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { asPath } = useRouter();

  const handleNewRoom = async (newRoom: NewRoom) => {
    const { data, status } = await addCommunityRoom(newRoom);

    if (data?.length) setCommunityRooms((prev) => [...prev, ...data]);
  };

  return (
    <AppLayout title={`${community.name} - Rooms`}>
      <h4>Checkout rooms</h4>
      <button onClick={() => setCreateModalOpen(true)}>Create room</button>

      <ul>
        {communityRooms.length > 0
          ? communityRooms.map((room) => (
              <li key={room.id}>
                <Link key={room.id} href={`${asPath}/${room.slug}`}>
                  {room.title}
                </Link>
              </li>
            ))
          : null}
      </ul>

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
