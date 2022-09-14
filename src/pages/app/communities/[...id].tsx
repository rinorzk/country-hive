// To be deleted

import React from "react";
import moment from "moment";
import {
  getUser,
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";
import { Community } from "@/base/types/db";

export default function CommunityPage({
  user,
  community,
}: {
  user: User;
  community: Community;
}) {
  return (
    <AppLayout title="albotalk - browse through communities of your country">
      <h3>ALBOTALK App</h3>
      <p>{user.email}</p>

      <h4>Community: {community.name}</h4>
      <p>Created at: {moment(community.created_at).format("DD MMM YYYY")}</p>
      <p>Created by: {community.creator_id}</p>
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const communityName = ctx.params.id && ctx.params.id[0];
    const { user } = await getUser(ctx);
    const props: { community: Community } = { community: null };

    if (communityName) {
      const { body } = await supabaseServerClient(ctx)
        .from<Community>("communities")
        .select("*")
        .eq("name", communityName);
      if (body) props.community = body[0];
    }

    return { props: { ...props, user } };
  },
});
