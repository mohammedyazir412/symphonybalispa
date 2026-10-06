import { notFound, redirect } from "next/navigation";
import BlogsIndex from "@/components/BlogsIndex";
import { blogsMetadata } from "@/lib/blogsMetadata";
import { getBlogPosts, POSTS_PER_PAGE } from "@/lib/wordpress";

interface Props {
  params: Promise<{ page: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const { totalPages } = await getBlogPosts({ page: 1, perPage: POSTS_PER_PAGE });
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { page } = await params;
  return blogsMetadata(parseInt(page, 10) || 1);
}

export default async function BlogsPaged({ params }: Props) {
  const { page } = await params;
  const n = parseInt(page, 10);
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) redirect("/blogs");
  return <BlogsIndex currentPage={n} />;
}
