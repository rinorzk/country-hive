import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Community } from "../types/db";

export const useCommunity = (props) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [newCommunity, handleNewCommunity] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) getCommunities(setCommunities);
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
  setState: Dispatch<SetStateAction<Community[]>>
) => {
  try {
    let { body } = await supabaseClient
      .from<Community>("communities")
      .select("*");
    if (setState) setState(body);
    return body;
  } catch (error) {
    console.log("error", error);
  }
};

export const addCommunity = async (
  name: string,
  type: string,
  members: any[],
  userId: string
) => {
  try {
    let { body } = await supabaseClient
      .from<Community>("communities")
      .insert({ name, type, members, creator_id: userId });
    return body;
  } catch (error) {
    console.log("error", error, "test");
  }
};
