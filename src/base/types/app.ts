import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery } from "querystring";

export type ServerSidePropsCtx = GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>;

export type Country = {
  name: string;
  flag: string;
};

export type CommunityType = "public" | "restricted" | "private";

export type NewCommunity = {
  name: string;
  country: string;
  description: string;
  type: CommunityType;
  creator_id: string;
  created_at?: string;
  slug: string;
  intro: {};
  avatar_url?: string;
  cover_url?: string;
};

export type NewPost = {
  community_id: string;
  creator_id: string;
  title: string;
  content: {};
  created_at?: string;
  slug: string;
};

export type NewRoom = {
  community_id: string;
  creator_id: string;
  title: string;
  description: string;
  created_at?: string;
  slug: string;
};

export type NewRoomMessage = {
  room_id: string;
  creator_id: string;
  content: string;
  reply_id?: string;
};

export type NewPostComment = {
  post_id: string;
  creator_id: string;
  content: string;
  parent_id?: string;
};
