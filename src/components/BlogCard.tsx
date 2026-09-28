"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/wordpress";
import { IconArrowRight } from "@/components/icons";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage =
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80";

  const displayImage =
    !imageError && post.imageUrl ? post.imageUrl : fallbackImage;
  const primaryCategory = post.categories[0] || post.tags[0] || "Rituals";

  return (
    <article className="h-full">
      <Link href={`/blogs/${post.slug}`} className="group block h-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
          <Image
            src={displayImage}
            alt={post.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            onError={() => setImageError(true)}
          />
        </div>

        <div className="pt-5">
          <p className="eyebrow">
            {primaryCategory} · {post.dateFormatted}
          </p>

          <h3 className="mt-2 font-display text-xl text-ink transition-colors group-hover:text-gold line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/60 line-clamp-3">
            {post.excerpt}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.1em] text-gold uppercase">
            READ ARTICLE
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
