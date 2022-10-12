import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery } from "querystring";

export type ServerSidePropsCtx = GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>;

export type NewCommunity = {
  name: string;
  country: string;
  type: "public" | "restricted" | "private";
  creator_id: string;
  created_at?: string;
};

export type NewPost = {
  community_id: string;
  creator_id: string;
  title: string;
  description: string;
  created_at?: string;
};
