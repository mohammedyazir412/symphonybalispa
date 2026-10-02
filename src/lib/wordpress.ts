export interface WPTitle {
  rendered: string;
}

export interface WPExcerpt {
  rendered: string;
  protected?: boolean;
}

export interface WPContent {
  rendered: string;
  protected?: boolean;
}

export interface WPMediaItem {
  id?: number;
  source_url?: string;
  code?: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

export interface WPTermItem {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPRawPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WPTitle;
  excerpt: WPExcerpt;
  content: WPContent;
  _embedded?: {
    "wp:featuredmedia"?: WPMediaItem[];
    "wp:term"?: WPTermItem[][];
  };
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateFormatted: string;
  modified: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  readTime: string;
  categories: string[];
  tags: string[];
}

export interface PaginatedPosts {
  posts: BlogPost[];
  totalPages: number;
  totalPosts: number;
  currentPage: number;
}

export const WP_API_BASE =
  "https://public-api.wordpress.com/wp/v2/sites/symphonybalispa-ervhc.wordpress.com";
export const POSTS_PER_PAGE = 9;

/**
 * Strips HTML tags and unescapes basic HTML entities.
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/\[&hellip;\]/g, "…")
    .replace(/\[…\]/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Decodes HTML entities in titles without stripping standard formatting.
 */
export function decodeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/<[^>]*>/g, "")
    .trim();
}

/**
 * Formats an ISO date into "DD Month YYYY" (e.g. 23 July 2026).
 */
export function formatBlogDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Computes estimated reading time from word count.
 */
export function calculateReadTime(contentHtml: string): string {
  const plainText = stripHtml(contentHtml);
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Normalizes a raw WordPress post into our clean BlogPost type.
 */
export function transformWPPost(raw: WPRawPost): BlogPost {
  const title = decodeHtml(raw.title?.rendered || "Untitled Post");
  const rawExcerpt = raw.excerpt?.rendered || "";
  const plainExcerpt = stripHtml(rawExcerpt);

  // Take first ~24 words for clean excerpt display
  const words = plainExcerpt.split(" ");
  const excerpt =
    words.length > 24 ? words.slice(0, 24).join(" ") + "…" : plainExcerpt;

  const content = raw.content?.rendered || "";
  const readTime = calculateReadTime(content || plainExcerpt);

  let imageUrl: string | undefined = undefined;
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  if (media && !media.code && media.source_url) {
    imageUrl = media.source_url;
  }

  const terms = raw._embedded?.["wp:term"] || [];
  const categories: string[] = [];
  const tags: string[] = [];

  terms.forEach((termGroup) => {
    termGroup.forEach((term) => {
      if (term.taxonomy === "category" && term.slug !== "uncategorized") {
        categories.push(term.name);
      } else if (term.taxonomy === "post_tag") {
        tags.push(term.name);
      }
    });
  });

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    date: raw.date,
    dateFormatted: formatBlogDate(raw.date),
    modified: raw.modified,
    excerpt,
    content,
    imageUrl,
    readTime,
    categories,
    tags,
  };
}

/**
 * Fetches paginated posts from the WordPress REST API.
 */
export async function getBlogPosts(options?: {
  page?: number;
  perPage?: number;
}): Promise<PaginatedPosts> {
  const page = Math.max(1, options?.page || 1);
  const perPage = options?.perPage || POSTS_PER_PAGE;

  const url = `${WP_API_BASE}/posts?_embed=1&per_page=${perPage}&page=${page}&_fields=id,slug,date,modified,title,excerpt,content,_links,_embedded`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return { posts: [], totalPages: 1, totalPosts: 0, currentPage: page };
    }

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    const totalPosts = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    const rawData = (await res.json()) as WPRawPost[];

    if (!Array.isArray(rawData)) {
      return { posts: [], totalPages: 1, totalPosts: 0, currentPage: page };
    }

    const posts = rawData.map(transformWPPost);
    return {
      posts,
      totalPages: Math.max(1, totalPages),
      totalPosts,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching blog posts from WordPress API:", error);
    return { posts: [], totalPages: 1, totalPosts: 0, currentPage: page };
  }
}

/**
 * Fetches a single blog post by its slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9\-]/g, "");

  const url = `${WP_API_BASE}/posts?slug=${encodeURIComponent(cleanSlug)}&_embed=1`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as WPRawPost[];
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return transformWPPost(data[0]);
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches recent/related posts excluding the current slug.
 */
export async function getRecentBlogPosts(
  excludeSlug?: string,
  limit: number = 3
): Promise<BlogPost[]> {
  try {
    const { posts } = await getBlogPosts({ page: 1, perPage: limit + 2 });
    return posts.filter((p) => p.slug !== excludeSlug).slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Fetches all post slugs for static params and sitemap generation.
 */
export async function getAllBlogPostSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${WP_API_BASE}/posts?per_page=100&_fields=slug`, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { slug: string }[];
    return Array.isArray(data) ? data.map((item) => item.slug) : [];
  } catch {
    return [];
  }
}
