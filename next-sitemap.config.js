/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://southlamarstudios.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://southlamarstudios.com/server-sitemap.xml',
    ],
  },
  // Add any custom paths to exclude from sitemap
  exclude: ['/admin'],
} 