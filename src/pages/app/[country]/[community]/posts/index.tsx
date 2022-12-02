import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community, Post } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import { getCommunityServer } from "@/base/lib/community";
import { addCommunityPost, getCommunityPostsServer } from "@/base/lib/posts";
import NewPostModal from "@/components/sections/new-post-modal";
import { NewPost } from "@/base/types/app";

export default function Posts({
  user,
  community,
  posts,
}: {
  user: User;
  community: Community;
  posts: Post[];
}) {
  const [communityPosts, setCommunityPosts] = useState<Post[]>(posts);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { asPath } = useRouter();

  const handleNewPost = async (newPost: NewPost) => {
    const { data, status } = await addCommunityPost(newPost);

    if (data?.length) setCommunityPosts((prev) => [...prev, ...data]);
  };

  function renderPostLink(post: Post) {
    return (
      <li key={post.id}>
        <Link key={post.id} href={`${asPath}/${post.slug}`}>
          {post.title}
        </Link>
      </li>
    );
  }

  return (
    <AppLayout title={`${community.name} - Posts`}>
      <h4>Checkout posts</h4>
      <button onClick={() => setCreateModalOpen(true)}>Create post</button>

      <ul>
        {communityPosts.length > 0 ? communityPosts.map(renderPostLink) : null}
      </ul>

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
