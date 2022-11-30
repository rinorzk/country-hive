import React, { useState } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import NewCommunityModal from "@/components/sections/new-community-modal";
import { addCommunity, getAllCommunitiesServer } from "@/base/lib/community";
import { NewCommunity } from "@/base/types/app";

export default function Country({
  country,
  user,
  communities,
}: {
  country: string;
  user: User;
  communities: Community[];
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [communitiesList, setCommunitiesList] =
    useState<Community[]>(communities);

  const handleNewCommunity = async (newCommunity: NewCommunity) => {
    const { status } = await addCommunity(newCommunity);

    if (status === 201) setCommunitiesList((prev) => [...prev, newCommunity]);
  };

  return (
    <AppLayout title={`${country.toUpperCase()} - Communities`}>
      <h2>Browse {country} communities</h2>
      <ul>
        {!!communitiesList.length &&
          communitiesList.map((cmt) => (
            <li key={cmt.id}>
              <Link
                key={cmt.id}
                href={`/app/${kebabCase(country)}/${cmt.slug}`}
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
        handleNewCommunity={handleNewCommunity}
      />
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const country = ctx.params.country as string;
    let props = { user };

    if (country) {
      const { data: communities } = await getAllCommunitiesServer(ctx, country);

      return { props: { ...props, country, communities } };
    }

    return { props };
  },
});
