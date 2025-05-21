import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
});

export const getClient = (preview: boolean = false) => {
  return preview ? previewClient : client;
};

// Function to fetch all blog posts
export async function getAllBlogPosts(preview: boolean = false) {
  const client = getClient(preview);
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
  });
  
  return entries.items;
}

// Function to fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string, preview: boolean = false) {
  const client = getClient(preview);
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  
  return entries.items[0] || null;
}

// Helper function to transform a blog post for the frontend
export function transformBlogPost(post: any) {
  if (!post) return null;

  return {
    id: post.sys.id,
    title: post.fields.title,
    slug: post.fields.slug,
    content: post.fields.content,
    excerpt: post.fields.excerpt,
    featuredImage: post.fields.featuredImage?.fields?.file?.url 
      ? `https:${post.fields.featuredImage.fields.file.url}`
      : null,
    category: post.fields.category,
    publishDate: post.fields.publishDate,
  };
} 