export type Community = {
  id: string;
  name: string;
  created_at: string;
  type: "public" | "restricted" | "private";
  creator_id: string;
  country: string;
  slug: string;
};

export type Member = {
  community_id: string;
  member_id: string;
  created_at?: string;
  approved: boolean;
};

export type Post = {
  id: string;
  community_id: string;
  creator_id: string;
  title: string;
  description?: string;
  created_at: string;
  slug: string;
};

export type Room = {
  id: string;
  community_id: string;
  creator_id: string;
  title: string;
  description?: string;
  created_at: string;
  slug: string;
};

export type RoomMessage = {
  id: string;
  creator_id: string;
  room_id: string;
  reply_id?: string;
  created_at: string;
  content: string;
  profile: {
    username: string;
  };
  reply: {
    content: string;
  };
};

export type PostComment = {
  id: string;
  creator_id: string;
  post_id: string;
  created_at: string;
  content: string;
  profile: {
    username: string;
  };
};
