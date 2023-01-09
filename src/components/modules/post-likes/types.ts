export interface PostLikeProps {
  likes: number;
  isLiked: boolean;
  onClick: (like: boolean) => void;
}
