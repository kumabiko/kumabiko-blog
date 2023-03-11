import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase-server";
import type { BlogListType } from "../../../utils/blog.types";

import BlogDetail from "../../components/blog/blog-detail";

type PageProps = {
  params: {
    blogId: string;
  };
};

// ブログ詳細
const BlogDetailPage = async ({ params }: PageProps) => {
  const supabase = createClient();

  // ブログ詳細取得
  const { data: blogData } = await supabase
    .from("blogs")
    .select(
      "*, comments(id, content, created_at, profiles(name, avatar_url), likes(user_id))"
    ) // コメント取得
    .eq("id", params.blogId)
    .returns<BlogListType>() // 型を指定
    .maybeSingle();

  const typedBlogData = blogData as BlogListType | null;

  // ブログが存在しない場合
  if (!typedBlogData) return notFound();

  // プロフィール取得
  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("id", typedBlogData.user_id)
    .single();

  // 表示ブログ詳細作成
  const blog: BlogListType = {
    id: typedBlogData.id,
    created_at: typedBlogData.created_at,
    title: typedBlogData.title,
    content: typedBlogData.content,
    image_url: typedBlogData.image_url,
    user_id: typedBlogData.user_id,
    name: profileData!.name,
    avatar_url: profileData!.avatar_url,
    comments: typedBlogData.comments,
  };

  return <BlogDetail blog={blog} />;
};

export default BlogDetailPage;
