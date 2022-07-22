export type Community = {
  id: number;
  name: string;
  created_at: string;
  members: any[]; // to fix later when creating member type
  type: string;
  creator_id: string;
};
