import React, { useState } from "react";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community, Post } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import { getCommunityServer } from "@/base/lib/community";
import { getCommunityPostsServer } from "@/base/lib/posts";
import NewPostModal from "@/components/sections/new-post-modal";

export default function Posts({
  user,
  community,
  posts,
}: {
  user: User;
  community: Community;
  posts: Post[];
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleNewPost = () => {};

  return (
    <AppLayout title={`${community.name} - Posts`}>
      <h4>Checkout posts</h4>
      <button onClick={() => setCreateModalOpen(true)}>Create post</button>

      <NewPostModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        userId={user.id}
        communityId={community.id}
        handleNewPost={handleNewPost}
      />
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
      const { data: community } = await getCommunityServer(
        ctx,
        communityName,
        country
      );

      const { data: posts } = await getCommunityPostsServer(
        ctx,
        community[0].id
      );

      return {
        props: { ...props, community: community[0], posts },
      };
    }

    return { props };
  },
});
