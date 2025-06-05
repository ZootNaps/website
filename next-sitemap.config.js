/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://southlamarstudios.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      // Consolidated wildcard user agent with disallow rules
      { 
        userAgent: '*', 
        disallow: ['/admin'] 
      },
      // AI crawlers that should be explicitly allowed
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Anthropic-AI', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    additionalSitemaps: [
      'https://southlamarstudios.com/server-sitemap.xml',
    ],
  },
  // Add any custom paths to exclude from sitemap
  exclude: ['/admin'],
}