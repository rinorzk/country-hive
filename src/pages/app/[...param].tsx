import React, { useState } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import AppLayout from "@/components/layouts/app-layout";
import { getUser, withPageAuth, User } from "@supabase/auth-helpers-nextjs";
import NewCommunityModal from "@/components/sections/new-community-modal";
import { useCommunity } from "@/base/lib/community";

export default function Country({
  user,
  country,
}: {
  user: User;
  country: string;
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { communities } = useCommunity({ country });

  return (
    <AppLayout title={`${country.toUpperCase()} - Communities`}>
      <h2>Browse {country} communities</h2>
      <ul>
        {!!communities.length &&
          communities.map((community) => (
            <li key={community.id}>
              <Link
                key={community.id}
                href={`/app/communities/${kebabCase(community.name)}`}
              >
                <a>{community.name}</a>
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
    return { props: { user: user, country: ctx.params.param[0] } };
  },
});
