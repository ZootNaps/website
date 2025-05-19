// This is a temporary file that disables Contentful integration until it's properly set up

// Types for Contentful blog post entries
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text content
  publishDate: string;
  featuredImage: {
    url: string;
    title: string;
    description: string;
    width: number;
    height: number;
  } | null;
  author: {
    name: string;
    bio: string;
    picture: {
      url: string;
    } | null;
  } | null;
}

// Temporarily return empty data
export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('Contentful integration disabled for now');
  return [];
}

// Temporarily return null
export async function getBlogPostBySlug(): Promise<BlogPost | null> {
  console.log('Contentful integration disabled for now');
  return null;
}

// Dummy clients until Contentful is set up
export const contentfulClient = null;
export const contentfulPreviewClient = null;
export function getClient() {
  return null;
} 