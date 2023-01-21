import { Room } from "@/base/types/db";

export interface RoomListProps {
  rooms: Room[];
  path: string;
  userId: string;
}
