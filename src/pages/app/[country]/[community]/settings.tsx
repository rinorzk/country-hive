import React from "react";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import dynamic from "next/dynamic";
import { Community } from "@/base/types/db";
import { getCommunityServer } from "@/base/lib/community";
import {
  addApprovedCommunityMember,
  getUserByUsername,
} from "@/base/lib/members";
import AppLayout from "@/components/layouts/app-layout";
import ApproveMember from "@/components/sections/approve-member";
import { useUser } from "@supabase/auth-helpers-react";
import CommunityAvatarUpload from "@/components/modules/community-avatar-upload";
import CommunityCoverUpload from "@/components/modules/community-cover-upload";
import { useRouter } from "next/router";

const DynamicRichtextEditor = dynamic(
  () => import("@/components/sections/richtext-editor"),
  { ssr: false }
);

export default function CommunitySettings({
  community,
  isAdmin,
}: {
  community: Community;
  isAdmin: boolean;
}) {
  const { user } = useUser();
  const { asPath } = useRouter();
  const communityPath = asPath.replace("/settings", "");

  async function handleApproveUser(username: string) {
    const { data, error } = await getUserByUsername(username);
    if (data.length === 0) return alert("no user found with that username");

    const newMember = {
      member_id: data[0].id,
      community_id: community.id,
      can_post: true,
      approved: true,
    };
    const { data: approved } = await addApprovedCommunityMember(newMember);
  }

  return (
    <AppLayout
      title={`${community.name} - Community`}
      type="settings"
      slug={communityPath}
    >
      <h4>Community: {community.name}</h4>
      <h4>Update avatar:</h4>
      <CommunityAvatarUpload
        url={community.avatar_url}
        alt={community.name}
        folderName={community.id}
        fileName={community.slug + "_avatar"}
      />
      <h4>Update cover:</h4>
      <CommunityCoverUpload
        url={community.cover_url}
        alt={community.name}
        folderName={community.id}
        fileName={community.slug + "_cover"}
      />
      <ApproveMember
        onSubmit={handleApproveUser}
        communityId={community.id}
        userId={user?.id}
      />
      <h4>Homepage:</h4>
      <DynamicRichtextEditor
        content={community.intro}
        communityId={community.id}
      />
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

      const isAdmin = community[0].creator_id === user.id;

      if (!isAdmin) {
        return {
          redirect: { destination: `/app/${country}/${communitySlug}` },
          props: {},
        };
      }

      return {
        props: { ...props, community: community[0], isAdmin },
      };
    }

    return { props };
  },
});
