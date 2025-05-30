import { getBlogPosts } from '@/lib/contentful/client';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    const publishedPosts = posts.filter(post => post.status === 'Published');
    
    const baseUrl = process.env.SITE_URL || 'https://southlamarstudios.com';
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>South Lamar Studios Blog</title>
    <description>Expert strategies and insights on our 'Podcast for Sales' system, sales-first podcasting, and using executive interviews to generate qualified leads and drive revenue.</description>
    <link>${baseUrl}/blog</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog-rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>hello@southlamarstudios.com (South Lamar Studios)</managingEditor>
    <webMaster>hello@southlamarstudios.com (South Lamar Studios)</webMaster>
    <copyright>© ${new Date().getFullYear()} South Lamar Studios. All rights reserved.</copyright>
    <category>Business</category>
    <category>Marketing</category>
    <category>Podcasting</category>
    <category>B2B</category>
    ${publishedPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.metaDescription || post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <author>hello@southlamarstudios.com (South Lamar Studios)</author>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ''}
      ${post.tags && post.tags.length > 0 ? post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('') : ''}
    </item>`).join('')}
  </channel>
</rss>`.trim();

    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating blog RSS feed:', error);
    
    return new Response('Error generating RSS feed', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
} 