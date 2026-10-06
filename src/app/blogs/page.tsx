import BlogsIndex from "@/components/BlogsIndex";
import { blogsMetadata } from "@/lib/blogsMetadata";

export const metadata = blogsMetadata(1);

export default function BlogsPage() {
  return <BlogsIndex currentPage={1} />;
}
