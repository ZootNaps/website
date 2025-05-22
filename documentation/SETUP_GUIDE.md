# Setup Guide

This guide provides step-by-step instructions for setting up the South Lamar Studios website locally for development.

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Git for version control
- A Contentful account for CMS functionality

## Environment Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # Contentful CMS
   CONTENTFUL_SPACE_ID=your_contentful_space_id
   CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
   CONTENTFUL_PREVIEW_TOKEN=your_contentful_preview_token
   CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
   
   # Site URL (for sitemap generation)
   SITE_URL=http://localhost:3000
   
   # Google Tag Manager (optional for development)
   NEXT_PUBLIC_GTM_ID=your_gtm_id
   
   # Google Analytics (optional for development)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
   ```

## Contentful CMS Setup

1. Create a Contentful account at [contentful.com](https://www.contentful.com) if you don't have one
2. Create a new space or use an existing one
3. Set up content models for:
   - Blog Post
   - Other content types as needed
4. Generate API keys:
   - Go to Settings > API keys
   - Create a new API key
   - Note the Space ID, Content Delivery API access token, and Preview API access token
   - Use these values in your `.env.local` file
5. For content management (scripts):
   - Generate a Personal Access Token from User Settings > API tokens
   - Use this as your `CONTENTFUL_MANAGEMENT_TOKEN`

## Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Build for Production

To build the site for production:

```bash
npm run build
# or
yarn build
```

This will generate a production-ready build in the `.next` directory and automatically generate a sitemap.

## Verifying the Setup

1. Ensure the homepage loads at http://localhost:3000
2. Verify that content is being fetched from Contentful
3. Check for any console errors related to missing environment variables

## Common Setup Issues

### Contentful Connection Issues

If content isn't loading:
- Verify your API keys in the `.env.local` file
- Check that your content models match the expected fields in the code
- Ensure you have published content in Contentful

### Build Errors

- Missing dependencies: Run `npm install` again
- TypeScript errors: Fix type issues reported by the compiler
- Module not found errors: Check import paths

### Environment Variables

- Ensure all required environment variables are set in `.env.local`
- For deployment, add these variables to your hosting platform (Vercel)

## Development Tools

The project includes several helpful tools:

- TypeScript for type checking: `npx tsc --noEmit`
- ESLint for code linting: `npm run lint`
- Next.js analytics: Available in the Vercel dashboard after deployment

## Editor Setup

For optimal development experience:

- Use Visual Studio Code with the following extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript support

## Recommended Configuration

- Enable formatting on save in your editor
- Configure TypeScript strict checking
- Use browser developer tools for debugging 