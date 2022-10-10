export type Community = {
  id: string;
  name: string;
  created_at: string;
  type: "public" | "restricted" | "private";
  creator_id: string;
  country: string;
};

export type Member = {
  community_id: string;
  member_id: string;
  created_at?: string;
  approved: boolean;
};

export type NewCommunity = {
  name: string;
  country: string;
  type: "public" | "restricted" | "private";
  creator_id: string;
  created_at: string;
};
