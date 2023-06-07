import { Community } from "@/base/types/db";

export interface CommunitiesListProps {
  communities: Community[];
  country?: string;
  createCommunityHandler?: () => void;
}
