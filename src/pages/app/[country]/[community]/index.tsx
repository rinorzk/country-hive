import React from "react";
import moment from "moment";
import {
  getUser,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { Community as CommunityType } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";

export default function Community({ community }: { community: CommunityType }) {
  return (
    <AppLayout title={`${community.name} - Community`}>
      <h4>Community: {community.name}</h4>
      <p>Created at: {moment(community.created_at).format("DD MMM YYYY")}</p>
      <p>Created by: {community.creator_id}</p>
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

      return {
        props: { ...props, community: community[0] },
      };
    }

    return { props };
  },
});
