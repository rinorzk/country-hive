import React, { useState } from "react";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";
import NewCommunityModal from "@/components/sections/new-community-modal";
import { useCommunity } from "@/base/lib/community";

export default function Communities({ user }: { user: User }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { communities } = useCommunity({});

  return (
    <AppLayout title="albotalk - browse through communities of your country">
      <h3>ALBOTALK App</h3>
      <p>{user.email}</p>

      <button onClick={() => setCreateModalOpen(true)}>
        Create new community
      </button>

      <h4>List of all communities:</h4>
      <div>
        {!!communities.length &&
          communities.map((community) => (
            <p key={community.id}>{community.name}</p>
          ))}
      </div>

      <NewCommunityModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        userId={user.id}
      />
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    return { props: { user: user } };
  },
});
