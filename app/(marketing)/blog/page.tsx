import { client } from "@/sanity/client"; // Adjust path to your sanity client
import BlogClient from "@/components/blog/blog-client";

// 1. Helper to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// 2. Fetch Data with GROQ
export async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      excerpt,
      category,
      "author": author->name,
      publishedAt,
      readTime,
      featured
    }
  `;
  return client.fetch(query);
}

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function BlogPage() {
  const rawPosts = await getPosts();

  // 3. Transform data if necessary (e.g. format dates)
  const posts = rawPosts.map((post: any) => ({
    ...post,
    publishedAt: formatDate(post.publishedAt),
    // If you didn't get the URL in GROQ, use urlFor here:
    // mainImage: urlFor(post.mainImage).url() 
  }));

  return <BlogClient posts={posts} />;
}