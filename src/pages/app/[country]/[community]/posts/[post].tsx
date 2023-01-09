import React from "react";
import AppLayout from "@/components/layouts/app-layout";
import { useUser } from "@supabase/auth-helpers-react";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Post as PostType } from "@/base/types/db";
import { getCommunityServer } from "@/base/lib/community";
import {
  dislikePost,
  getCommunityPostWithLikesServer,
  likePost,
} from "@/base/lib/posts";
import PostComments from "@/components/sections/post-comments";
import PostLikes from "@/components/modules/post-likes";

export default function Post({ post }: { post: PostType }) {
  const { user } = useUser();

  async function handleLikePost(
    liked: boolean,
    postId: string,
    memberId: string
  ) {
    try {
      if (liked) {
        const { data, error } = await likePost(postId, memberId);
      } else {
        const { data, error } = await dislikePost(postId, memberId);
      }
    } catch (error) {}
  }

  return (
    <AppLayout>
      <h4>{post?.title}</h4>
      <PostLikes
        likes={post.likes}
        isLiked={post.is_liked}
        onClick={(liked) => handleLikePost(liked, post.id, user.id)}
      />
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
