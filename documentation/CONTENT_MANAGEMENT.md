# Content Management Guide

This guide provides instructions for managing content in the South Lamar Studios website using Contentful CMS.

## Contentful Overview

The website uses Contentful as its headless CMS. Contentful provides a flexible content management interface with a robust API that allows the website to fetch and display content.

## Content Models

### Blog Post

The blog post content model includes:

| Field Name | Type | Description |
|------------|------|-------------|
| title | Short text | Post title |
| slug | Short text | URL-friendly identifier (must be unique) |
| excerpt | Short text | Brief summary for previews |
| content | Rich text | Main content body |
| featuredImage | Media | Main image for the post |
| category | Short text | Post category (see categories below) |
| publishDate | Date & time | Publication date |
| metaTitle | Short text | SEO title |
| metaDescription | Short text | SEO description |
| focusKeyword | Short text | Primary SEO keyword |
| tags | Short text (multiple) | Related topics |
| isFeatured | Boolean | Whether to display in featured section |
| readingTimeMinutes | Number | Estimated reading time (optional) |

**Publication Status**: The system automatically uses Contentful's built-in publication status. Only published entries will appear on the website.

#### Blog Categories

The blog system supports the following categories, each with unique styling and icons:

- **Playbook 📋:** Step-by-step guides and actionable frameworks
  - Use for: Implementation guides, workflows, checklists
  - Styling: Emerald green color scheme (bg-emerald-500, text-emerald-600, bg-emerald-50)
  
- **Deep Dive 🔍:** In-depth analysis and comprehensive coverage  
  - Use for: Detailed analysis, comprehensive tutorials, research
  - Styling: Blue color scheme (bg-blue-600, text-blue-600, bg-blue-50)
  
- **Strategy 🎯:** Strategic insights and planning guidance
  - Use for: Business strategy, planning frameworks, high-level guidance
  - Styling: Purple color scheme (bg-purple-600, text-purple-600, bg-purple-50)
  
- **Case Study 📊:** Real-world examples and success stories
  - Use for: Client stories, project breakdowns, results analysis
  - Styling: Orange color scheme (bg-orange-600, text-orange-600, bg-orange-50)
  
- **Industry Insights 📈:** Market trends and industry analysis
  - Use for: Market analysis, trend reports, industry news
  - Styling: Indigo color scheme (bg-indigo-600, text-indigo-600, bg-indigo-50)
  
- **How To 🛠️:** Practical tutorials and implementation guides
  - Use for: Step-by-step tutorials, technical guides, tool usage
  - Styling: Green color scheme (bg-green-600, text-green-600, bg-green-50)

**Enhanced Category Features:**
- **Automatic Styling**: Categories are automatically styled with unique color schemes and icons
- **Priority Sorting**: Categories are sorted by priority for consistent display order
- **Filter Functionality**: Blog pages include enhanced category filtering
- **Visual Consistency**: Each category has consistent badges, backgrounds, and hover effects
- **Responsive Design**: Category styling adapts to mobile and desktop layouts

Categories are automatically sorted by priority and displayed with unique visual styling including colored badges, icons, and hover effects. The system uses the `categoryUtils.ts` utility for consistent styling across the website.

### Podcast Episode

The podcast episode content model includes:

| Field Name | Type | Description |
|------------|------|-------------|
| title | Short text | Episode title |
| slug | Short text | URL-friendly identifier (must be unique) |
| description | Long text | Episode description |
| summary | Short text | Brief episode summary |
| keyTopics | Short text (multiple) | Main topics covered |
| publishDate | Date & time | Publication date |
| duration | Short text | Episode length |
| guest | Short text | Guest name |
| guestTitle | Short text | Guest's title/position |
| episodeNumber | Short text | Episode number |
| spotifyEmbedUrl | Short text | Spotify embed URL |
| fullTranscript | Rich text | Complete episode transcript |
| pullQuotes | Reference (multiple) | Featured quotes |
| resourcesMentioned | Reference (multiple) | Links and resources |
| coverArt | Media | Episode cover image |

### Other Content Types

Additional content types may be defined in Contentful based on project needs. Refer to the content models in the Contentful interface for full details.

## Content Management Workflow

### Creating a New Blog Post

1. Log in to Contentful
2. Navigate to the Content section
3. Click "Add Entry" and select "Blog Post"
4. Fill in required fields:
   - Title
   - Slug (auto-generated but can be customized)
   - Content (using the rich text editor)
   - Featured Image
   - Category
   - Publish Date
   - SEO metadata
5. Save the draft
6. Preview the content (if preview environment is set up)
7. Publish when ready

### Editing Existing Content

1. Navigate to the Content section in Contentful
2. Find the entry you want to edit using search or filters
3. Make necessary changes
4. Save changes
5. Republish the entry

### Managing Media Assets

1. Upload images to the Media section in Contentful
2. Organize assets using folders
3. Add metadata to images (title, description, alt text)
4. Reference media in content entries

## Rich Text Editor

The rich text editor in Contentful provides various formatting options:

### Basic Formatting

- Headings (H1-H6)
- Bold, italic, underline
- Lists (bullet and numbered)
- Links
- Quotes

### Embedded Assets

To embed an image in rich text:

1. Place cursor where you want the image
2. Click the media icon in the toolbar
3. Select an existing asset or upload a new one
4. Add caption and alignment options
5. Click "Insert"

### Embedded Entries

To embed another content item:

1. Place cursor where you want the reference
2. Click the entry icon in the toolbar
3. Select the entry to embed
4. Click "Insert"

## SEO Best Practices

For optimal SEO performance:

1. **Meta Title**: Write a compelling title under 60 characters
2. **Meta Description**: Create a concise description under 160 characters
3. **Focus Keyword**: Include your primary keyword in the title, URL, and content
4. **Alt Text**: Add descriptive alt text to all images
5. **Internal Links**: Link to other relevant content on the site
6. **Headings**: Use a logical heading structure (H1, then H2, etc.)

## Content Preview

To preview content before publishing:

1. Save your draft in Contentful
2. Use the preview functionality in Contentful (if configured)
3. Or visit the preview URL: `https://yourdomain.com/api/preview?secret=<preview-secret>&slug=<content-slug>`

## Content Publishing Schedule

Consider the following schedule for content updates:

- Blog posts: Regularly according to content calendar
- Core website content: Review quarterly
- SEO metadata: Review monthly and update based on analytics

## Image Guidelines

For optimal performance:

1. **Size**: Keep images under 1MB
2. **Dimensions**: Recommended width of 1200-1600px for featured images
3. **Format**: Use JPEG for photos, PNG for graphics with transparency
4. **Optimization**: Compress images before uploading
5. **Alt Text**: Always add descriptive alt text for accessibility and SEO

## Content Import/Export

### Importing Content

The project includes a script for importing content:

```bash
node scripts/import-podcast.js
```

This script requires:
- Properly formatted data source
- Contentful management token
- Proper content model in Contentful

### Exporting Content

To export content from Contentful:

1. Use the Contentful CLI:
   ```bash
   npm install -g contentful-cli
   contentful login
   contentful space export --space-id YOUR_SPACE_ID --environment-id master
   ```

2. Or use the Contentful web interface export functionality

## Handling Content Relationships

For content with relationships (like related posts):

1. Create the primary content entry
2. Create or select related entries
3. Use the reference field to connect entries
4. Publish all related entries

## Localization (if applicable)

If the site uses multiple languages:

1. Enable localization in Contentful settings
2. Create locale-specific content variants
3. Publish content in all required languages

## Troubleshooting

### Common Issues

1. **Content not showing on the site**:
   - Check if the entry is published
   - Verify the content model matches what the code expects
   - Check API access tokens

2. **Images not displaying**:
   - Verify the image is published
   - Check file format and size
   - Ensure the media field is properly referenced

3. **Rich text formatting issues**:
   - Check for unsupported formatting
   - Verify the rich text renderer configuration

## Content Backup

Contentful automatically backs up content, but you can also:

1. Regularly export content as described above
2. Keep a local copy of exports
3. Use version history in Contentful to revert changes

## Best Practices

1. Use consistent naming conventions for content entries
2. Add internal notes to entries for content team context
3. Establish a review process for content publication
4. Regularly audit content for outdated information
5. Monitor analytics to inform content strategy 