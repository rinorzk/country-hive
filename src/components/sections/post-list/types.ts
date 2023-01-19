import { Post } from "@/base/types/db";

export interface PostListProps {
  posts: Post[];
  path: string;
  userId: string;
}
