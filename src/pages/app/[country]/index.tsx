import React, { useState } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { getUser, supabaseClient, supabaseServerClient, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import NewCommunityModal from "@/components/sections/new-community-modal";

export default function Country({
  country,
  user,
  communities
}: {
  country: string;
  user: User;
  communities: Community[]
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [communitiesList, setCommunitiesList] = useState(communities)

  const handleNewCommunity = async (newCommunity) => {
    const { data, status } = await supabaseClient.from<Community>('communities').insert(newCommunity, { returning: 'minimal' })

    if (status === 201) setCommunitiesList((prev) => ([...prev, newCommunity]))
  }

  return (
    <AppLayout title={`${country.toUpperCase()} - Communities`}>
      <h2>Browse {country} communities</h2>
      <ul>
        {!!communitiesList.length &&
          communitiesList.map((cmt) => (
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
      const { body: communities } = await supabaseServerClient(ctx)
        .from<Community>("communities")
        .select("name, id")
        .eq("country", country);

      return { props: { ...props, country, communities } };
    }

    return { props };
  },
});
