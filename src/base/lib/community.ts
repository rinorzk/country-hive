import React from "react";
import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { Community, NewCommunity } from "../types/db";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

// export const useCommunity = ({ country }: { country: string }) => {
//   const [communities, setCommunities] = useState<Community[]>([]);
//   const [newCommunity, handleNewCommunity] = useState(null);
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) getCommunities(country, setCommunities);
//   }, [user]);

//   useEffect(() => {
//     const previousSubscriptions = supabaseClient.getSubscriptions();

//     // TODO: check for the community subscription
//     if (previousSubscriptions.length > 0) return;

//     const communityListener = supabaseClient
//       .from("communities")
//       .on("INSERT", (payload) => handleNewCommunity(payload.new))
//       .subscribe();

//     return () => {
//       communityListener.unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (newCommunity) {
//       setCommunities(communities.concat(newCommunity));
//     }
//   }, [newCommunity]);

//   return {
//     communities,
//   };
// };

// export const getCommunities = async (
//   country: string,
//   setState: Dispatch<SetStateAction<Community[]>>
// ) => {
//   try {
//     let { body } = await supabaseClient
//       .from<Community>("communities")
//       .select("id, name")
//       .eq("country", country);
//     if (setState) setState(body);
//     return body;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const addCommunity = async (community: NewCommunity) => {
  const { data, status } = await supabaseClient
    .from<Community>("communities")
    .insert(community);

  return { data, status };
};

export const getAllCommunities = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  country: string
) => {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Community>("communities")
    .select("name, id")
    .eq("country", country);

  return { data, status };
};

export const getCommunityServer = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  communityName: string,
  country: string
) => {
  const { data, status } = await supabaseServerClient(ctx)
    .from<Community>("communities")
    .select("*")
    .eq("name", communityName)
    .eq("country", country);

  return { data, status };
};
