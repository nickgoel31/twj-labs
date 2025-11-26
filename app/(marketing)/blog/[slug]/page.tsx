import ArticleClient from "@/components/blog/article-client";
import { client } from "@/sanity/client";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";

// 1. Update Interface to reflect that fields from Sanity can be null
export interface SanityPostResponse {
  title: string;
  subtitle?: string;
  publishedAt: string;
  readTime: string;
  category: string;
  body: any[]; 
  mainImage: string | null; // Can be null if no image uploaded
  author: {
    name: string;
    role: string;
    image?: string;
    bio?: string | null;
    social?: string | null;
  } | null; // Author reference can be broken or missing
}

const slugify = (text: string) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

async function getPost(slug: string): Promise<SanityPostResponse | null> {
  const query = `
    *[_type == "post" && slug.current == '${slug}'][0] {
      title,
      "subtitle": excerpt,
      publishedAt,
      readTime,
      category,
      body,
      "mainImage": mainImage.asset->url,
      author->{
        name,
        role,
        "image": image.asset->url
      }
    }
  `;
  return client.fetch(query, { slug });
}


export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Record<string, string | string[]> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const post = await getPost(slug)

  if (!post) {
    return {};
  }
 
  return {
    title: post.title,
    description: post.subtitle || "Read this insightful blog post.",
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const post = await getPost(slug);

  

  if (!post) {
    return notFound();
  }

  // 2. Safely generate TOC
  const headings = (post.body || [])
    .filter((block: any) => block.style === 'h2' )
    .map((block: any) => ({
      title: block.children?.[0]?.text || "Untitled Section",
      id: slugify(block.children?.[0]?.text || "")
    }));

  // 3. Create a Fallback Author object to prevent crashes
  const fallbackAuthor = {
    name: "The Walking Jumbo",
    role: "Team",
    image: undefined 
  };

  const formattedPost = {
    title: post.title,
    subtitle: post.subtitle,
    // Use optional chaining or null coalescing to ensure author always exists
    author: post.author || fallbackAuthor, 
    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) : "Date not available",
    readTime: post.readTime || "5 min read",
    category: post.category || "General",
    mainImage: post.mainImage || "", // Handle missing image
    body: post.body || [], 
    headings: headings,
  };

  return <ArticleClient post={formattedPost} />;
}

export async function generateStaticParams() {
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs.map((s: any) => ({ slug: s.slug }));
}