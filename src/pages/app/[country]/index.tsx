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

  async function handleNewCommunity(newCommunity: NewCommunity) {
    const { data, status } = await addCommunity(newCommunity);

    if (status === 201) setCommunitiesList((prev) => [...prev, ...data]);
  }

  function renderCommunityLink(cmt: Community) {
    return (
      <li key={cmt.id}>
        <Link key={cmt.id} href={`/app/${kebabCase(country)}/${cmt.slug}`}>
          {cmt.name}
        </Link>
      </li>
    );
  }

  return (
    <AppLayout title={`${country.toUpperCase()} - Communities`} type="app">
      <h2>Browse {country} communities</h2>
      <ul>
        {!!communitiesList.length && communitiesList.map(renderCommunityLink)}
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
