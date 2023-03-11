export type BlogItemType = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  image_url: string;
  name: string | null;
  avatar_url: string | null;
};

export type BlogListType = BlogItemType & {
  comments: CommentType[];
};

export type LikeType = {
  user_id: string;
};

export type ProfileType = {
  avatar_url: string | null;
  name: string | null;
};

export type CommentType = {
  id: string;
  content: string;
  created_at: string;
  profiles: ProfileType;
  likes: LikeType[];
};
