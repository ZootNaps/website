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
  try {
    const client = getClient(preview);
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
}

// Function to fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string, preview: boolean = false) {
  try {
    const client = getClient(preview);
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    return entries.items[0] || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

// Helper function to transform a blog post for the frontend
export function transformBlogPost(post: any) {
  if (!post) return null;

  try {
    // Safely access nested properties
    const fields = post.fields || {};
    const featuredImage = fields.featuredImage?.fields?.file?.url 
      ? `https:${fields.featuredImage.fields.file.url}`
      : null;
      
    return {
      id: post.sys?.id || '',
      title: fields.title || '',
      slug: fields.slug || '',
      content: fields.content || {},
      excerpt: fields.excerpt || '',
      featuredImage,
      category: fields.category || '',
      publishDate: fields.publishDate || new Date().toISOString(),
      // SEO Fields
      metaTitle: fields.metaTitle || '',
      metaDescription: fields.metaDescription || '',
      focusKeyword: fields.focusKeyword || '',
      tags: fields.tags || [],
      status: fields.status || 'Published',
    };
  } catch (error) {
    console.error('Error transforming blog post:', error);
    return null;
  }
} 