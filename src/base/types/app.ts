import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery } from "querystring";

export type ServerSidePropsCtx = GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>;
