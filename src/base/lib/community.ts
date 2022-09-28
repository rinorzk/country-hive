import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Community } from "../types/db";

export const useCommunity = ({ country }: { country: string }) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [newCommunity, handleNewCommunity] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) getCommunities(country, setCommunities);
  }, [user]);

  useEffect(() => {
    const previousSubscriptions = supabaseClient.getSubscriptions();

    // TODO: check for the community subscription
    if (previousSubscriptions.length > 0) return;

    const communityListener = supabaseClient
      .from("communities")
      .on("INSERT", (payload) => handleNewCommunity(payload.new))
      .subscribe();

    return () => {
      communityListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (newCommunity) {
      setCommunities(communities.concat(newCommunity));
    }
  }, [newCommunity]);

  return {
    communities,
  };
};

export const getCommunities = async (
  country: string,
  setState: Dispatch<SetStateAction<Community[]>>
) => {
  try {
    let { body } = await supabaseClient
      .from<Community>("communities")
      .select("id, name")
      .eq("country", country);
    if (setState) setState(body);
    return body;
  } catch (error) {
    console.log("error", error);
  }
};

export const addCommunity = async (
  name: string,
  type: string,
  userId: string,
  country: string
) => {
  try {
    let { body } = await supabaseClient
      .from<Community>("communities")
      .insert({ name, type, creator_id: userId, country });
    return body;
  } catch (error) {
    console.log("error", error);
  }
};
