export type CommunityType = "public" | "restricted" | "private";

export type Community = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  type: CommunityType;
  creator_id: string;
  country: string;
  slug: string;
  intro: {};
  avatar_url?: string;
  cover_url?: string;
};

export type Member = {
  community_id: string;
  member_id: string;
  created_at?: string;
  approved: boolean;
  can_post: boolean;
  member?: {
    username: string;
  };
};

export type Post = {
  id: string;
  community_id: string;
  creator_id: string;
  title: string;
  description?: string;
  created_at: string;
  slug: string;
  likes?: number;
  is_liked?: boolean;
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
  replyOf: {
    content: string;
  };
};

export type PostComment = {
  id: string;
  creator_id: string;
  post_id: string;
  created_at: string;
  content: string;
  parent_id?: string;
  profile: {
    username: string;
  };
  replies: PostComment[];
};

export type PostLikes = {
  post_id: string;
  member_id: string;
};
