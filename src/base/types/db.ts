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

export type Post = {
  id: string
  community_id: string
  creator_id: string
  title: string
  description: string
  created_at: string
}