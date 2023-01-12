import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Community as CommunityType, Member } from "@/base/types/db";
import AppLayout from "@/components/layouts/app-layout";
import {
  addMemberInCommunity,
  getCommunityMemberServer,
} from "@/base/lib/members";
import { getCommunityServer } from "@/base/lib/community";
import CommunityHero from "@/components/modules/community-hero";

const DynamicRichtextEditor = dynamic(
  () => import("@/components/sections/richtext-editor"),
  { ssr: false }
);

export default function Community({
  community,
  member,
  user,
}: {
  community: CommunityType;
  member: Member | null;
  user: User;
}) {
  const [userMember, setUserMember] = useState<Member>(member);
  const { asPath } = useRouter();

  async function handleJoinCommunity() {
    const communityMember = {
      community_id: community.id,
      member_id: user.id,
      approved: false,
      can_post: community.type === "public",
    };

    const { status } = await addMemberInCommunity(communityMember);
    if (status === 201) {
      setUserMember(communityMember);
    }
  }

  const subMenuLinks = [
    { label: "Intro", pathname: asPath },
    { label: "Posts", pathname: `${asPath}/posts` },
    { label: "Rooms", pathname: `${asPath}/rooms` },
  ];

  return (
    <AppLayout
      title={`${community.name} - Community`}
      subMenuLinks={subMenuLinks}
    >
      <CommunityHero
        cover_url={community.cover_url}
        avatar_url={community.avatar_url}
        name={community.name}
      />
      {/* <p>Created at: {moment(community.created_at).format("DD MMM YYYY")}</p> */}
      {community.intro ? (
        <DynamicRichtextEditor
          content={community.intro}
          communityId={community.id}
          readOnly
        />
      ) : null}
      {!userMember && (
        <button onClick={handleJoinCommunity}>Join Community</button>
      )}
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const communitySlug = ctx.params.community as string;
    const country = ctx.params.country as string;
    let props = { user };

    if (communitySlug) {
      const { data: community } = await getCommunityServer(
        ctx,
        communitySlug,
        country
      );

      const { data: member } = await getCommunityMemberServer(
        ctx,
        community[0].id,
        user.id
      );

      return {
        props: { ...props, community: community[0], member: member[0] || null },
      };
    }

    return { props };
  },
});
