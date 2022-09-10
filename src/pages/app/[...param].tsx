import React, { useState } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import AppLayout from "@/components/layouts/app-layout";
import {
  getUser,
  withPageAuth,
  User,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import NewCommunityModal from "@/components/sections/new-community-modal";
import { useCommunity } from "@/base/lib/community";
import { Community } from "@/base/types/db";

export default function Country({
  user,
  country,
  community,
}: {
  user: User;
  country: string;
  community?: Community[];
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { communities } = useCommunity({ country });

  if (community) {
    let currentCommunity = community[0];
    return (
      <AppLayout title={`${currentCommunity.name} - Community`}>
        <h4>Community: {currentCommunity.name}</h4>
        <p>
          Created at:{" "}
          {moment(currentCommunity.created_at).format("DD MMM YYYY")}
        </p>
        <p>Created by: {currentCommunity.creator_id}</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`${country.toUpperCase()} - Communities`}>
      <h2>Browse {country} communities</h2>
      <ul>
        {!!communities.length &&
          communities.map((cmt) => (
            <li key={cmt.id}>
              <Link
                key={cmt.id}
                href={`/app/${kebabCase(country)}/${cmt.name}`}
              >
                <a>{cmt.name}</a>
              </Link>
            </li>
          ))}
      </ul>

      <h3>Or create a new one</h3>
      <button onClick={() => setCreateModalOpen(true)}>Create community</button>
      <NewCommunityModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        userId={user.id}
        country={country}
      />
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const params = ctx.params.param;

    if (params.length == 1) {
      return { props: { user: user, country: params[0] } };
    }

    if (params.length == 2) {
      const communityName = params[1];
      const { body: community } = await supabaseServerClient(ctx)
        .from<Community>("communities")
        .select("*")
        .eq("name", communityName)
        .eq("country", params[0]);

      return { props: { user: user, country: params[0], community } };
    }

    return { props: { user: user, country: params[0] } };
  },
});
