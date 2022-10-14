import React from "react";
import AppLayout from "@/components/layouts/app-layout";
import { Post as PostType } from "@/base/types/db";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { getCommunityServer } from "@/base/lib/community";
import { getCommunityPostServer } from "@/base/lib/posts";

export default function Post({ post }: { post: PostType }) {
  return (
    <AppLayout>
      <h4>{post.title}</h4>
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    let props = { user };
    const country = ctx.params.country as string;
    const communitySlug = ctx.params.community as string;
    const postSlug = ctx.params.post as string;

    if (communitySlug) {
      const { data: community } = await getCommunityServer(
        ctx,
        communitySlug,
        country
      );

      const { data: post } = await getCommunityPostServer(
        ctx,
        community[0].id,
        postSlug
      );

      return {
        props: { ...props, community: community[0], post: post[0] || null },
      };
    }

    return { props };
  },
});