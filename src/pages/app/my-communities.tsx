import React from "react";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";
import { getAllJoinedCommunities } from "@/base/lib/community";
import CommunitiesList from "@/components/sections/community-list";
import { Community } from "@/base/types/db";

export default function MyCommunities({
  user,
  communities,
}: {
  user: User;
  communities: { communities: Community }[];
}) {
  const formatedCommunities = communities.map(
    (reference) => reference.communities
  );

  return (
    <AppLayout title="albotalk - browse through your communities" type="app">
      <h1>My communities</h1>
      <p>Browse through your communities</p>

      <CommunitiesList communities={formatedCommunities} />
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const { data } = await getAllJoinedCommunities(ctx, user.id);

    console.log("Data", data);

    return { props: { user: user, communities: data } };
  },
});
