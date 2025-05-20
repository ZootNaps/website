# Contentful Setup Guide

This guide provides instructions for setting up Contentful to manage podcast episodes for the South Lamar Studios website.

## Environment Variables

First, copy `.env.local.example` to `.env.local` and fill in the following variables:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_contentful_preview_token
```

You can find these values in your Contentful dashboard under Settings > API Keys.

## Content Model Structure

### Podcast Episode Content Type

Create a new content type in Contentful called `podcastEpisode` with the following fields:

| Field Name | Field ID | Type | Appearance | Required | Description |
|------------|----------|------|------------|----------|-------------|
| Title | `title` | Text | Single line | Yes | The title of the podcast episode |
| Slug | `slug` | Text | Slug | Yes | URL-friendly identifier (auto-generated from title) |
| Description | `description` | Text | Single line | Yes | Short description for display in episode listings |
| Summary | `summary` | Text | Multi-line | Yes | Longer summary for the episode detail page |
| Key Topics | `keyTopics` | Text, List | Single line | Yes | Bullet points for key topics discussed |
| Publish Date | `publishDate` | Date and time | Date picker | Yes | When the episode was published |
| Duration | `duration` | Text | Single line | Yes | Length of the episode (e.g., "45 min") |
| Guest | `guest` | Text | Single line | Yes | Name of the guest |
| Guest Title | `guestTitle` | Text | Single line | Yes | Position/title of the guest |
| Spotify Embed URL | `spotifyEmbedUrl` | Text | URL | Yes | URL for the Spotify embed iframe |
| Full Transcript | `fullTranscript` | Rich text | Rich text editor | No | Complete transcript of the episode |

### Pull Quote Content Type

Create a content type called `pullQuote` with these fields:

| Field Name | Field ID | Type | Appearance | Required | Description |
|------------|----------|------|------------|----------|-------------|
| Quote | `quote` | Text | Multi-line | Yes | The pull quote text |
| Attribution | `attribution` | Text | Single line | Yes | Who said the quote |

### Resource Content Type

Create a content type called `resource` with these fields:

| Field Name | Field ID | Type | Appearance | Required | Description |
|------------|----------|------|------------|----------|-------------|
| Title | `title` | Text | Single line | Yes | Name of the resource |
| URL | `url` | Text | URL | Yes | Link to the resource |
| Description | `description` | Text | Single line | No | Optional description |

### Add Reference Fields to Podcast Episode

After creating the above content types, add these reference fields to the `podcastEpisode` content type:

| Field Name | Field ID | Type | Appearance | Required | Description |
|------------|----------|------|------------|----------|-------------|
| Pull Quotes | `pullQuotes` | Reference, many | Entry cards | No | References to pullQuote entries |
| Resources Mentioned | `resourcesMentioned` | Reference, many | Entry cards | No | References to resource entries |

## Field Validation and Settings

### Slug Field
- Select "Slug" as the appearance
- Leave the "Default value" field empty
- In the "Generate slug from" dropdown, use "Use entry title field (default behaviour)"
- This will automatically create URL-friendly slugs from the title

### Rich Text Field (Full Transcript)
- Enable all formatting options for proper transcript formatting
- Adjust max size settings if lengthy transcripts are expected

## Content Entry Tips

### For the Transcript

The transcript should be formatted with proper headings and sections using the Rich Text editor in Contentful. 

Include these section headings in your transcript with proper HTML heading levels:
- Introduction
- Co-Founder Relationship
- Roles & Responsibilities
- Landing the First Customer
- Sales & Marketing Approach
- Conclusion

### For Spotify Embed URLs

To get the embed URL for Spotify:
1. Go to the episode on Spotify
2. Click "Share"
3. Select "Embed"
4. Copy just the `src` URL from the iframe code

Example URL format:
```
https://open.spotify.com/embed/episode/2jvm94zbltWRhnmTDjJ9uf?utm_source=generator&theme=0
```

## Preview Setup

1. Go to Settings → Content Preview
2. Add a new content preview configuration for podcastEpisode
3. Set the preview URL to:
   ```
   https://yourwebsite.com/api/preview?slug={entry.fields.slug}
   ```
4. Implement the preview API route in your Next.js application

## Testing

After setting up the content model and adding your first episode, restart your development server to ensure the environment variables are loaded:

```
npm run dev
```

Visit `http://localhost:3000/podcast` to see your episode listing and click through to see the detailed episode page. 