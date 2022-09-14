import React, { useState } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCommunity } from "@/base/lib/community";
import AppLayout from "@/components/layouts/app-layout";
import NewCommunityModal from "@/components/sections/new-community-modal";

export default function Country({
  country,
  user,
}: {
  country: string;
  user: User;
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { communities } = useCommunity({ country });

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
    const country = ctx.params.country;
    let props = { user };

    if (country) {
      return { props: { ...props, country } };
    }

    return { props };
  },
});
