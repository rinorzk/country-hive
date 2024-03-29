import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useUser } from "@supabase/auth-helpers-react";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";
import { Post as PostType } from "@/base/types/db";
import { getCommunityServer } from "@/base/lib/community";
import { getCommunityPostWithLikesServer } from "@/base/lib/posts";
import PostComments from "@/components/sections/post-comments";
import PostLikes from "@/components/modules/post-likes";

const DynamicRichtextEditor = dynamic(
  () => import("@/components/sections/richtext-editor"),
  { ssr: false }
);

export default function Post({ post }: { post: PostType }) {
  const { user } = useUser();
  const { asPath } = useRouter();
  const communityPath = asPath.replace(`/posts/${post.slug}`, "");

  return (
    <AppLayout title={post?.title} type="community" slug={communityPath}>
      <h1>{post?.title}</h1>
      <PostLikes
        likes={post.likes}
        isLiked={post.is_liked}
        postId={post.id}
        userId={user?.id}
      />
      {post.content ? (
        <DynamicRichtextEditor content={post.content} readOnly />
      ) : null}
      <PostComments postId={post?.id} userId={user?.id} />
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

      const { data: post } = await getCommunityPostWithLikesServer(
        ctx,
        community[0].id,
        postSlug,
        user.id
      );

      return {
        props: { ...props, community: community[0], post: post[0] || null },
      };
    }

    return { props };
  },
});
