# Utility Scripts

This directory contains utility scripts that are used for administrative and content management tasks but are not part of the website's runtime code.

## Available Scripts

### `import-podcast.js`

This script imports podcast episode data from a JSON file into Contentful CMS.

#### Usage

```bash
node scripts/import-podcast.js path/to/podcast-data.json
```

#### Requirements

- Requires the following environment variables in `.env.local`:
  - `CONTENTFUL_SPACE_ID` - Your Contentful space ID
  - `CONTENTFUL_MANAGEMENT_TOKEN` - A Contentful management token with write access

#### JSON Format

The input JSON file should have the following structure:

```json
{
  "title": "Episode Title",
  "slug": "episode-slug", // Optional, will be generated from title if not provided
  "episodeNumber": "42", // Optional, displayed as #42: Episode Title
  "description": "Short description for metadata",
  "summary": "Longer summary displayed on the episode page",
  "keyTopics": ["Topic 1", "Topic 2", "Topic 3"],
  "publishDate": "2023-06-15", // ISO date format
  "duration": "45 min",
  "guest": "Guest Name",
  "guestTitle": "Guest Position, Company", // Optional
  "spotifyEmbedUrl": "https://open.spotify.com/embed/episode/12345", // Optional
  "coverArtId": "contentful-asset-id", // Optional, ID of a pre-uploaded image in Contentful
  "fullTranscript": "Full episode transcript text", // Optional
  "pullQuotes": [ // Optional
    {
      "quote": "This is a notable quote from the episode",
      "attribution": "Guest Name"
    }
  ],
  "resourcesMentioned": [ // Optional
    {
      "title": "Resource Name",
      "url": "https://example.com",
      "description": "Optional description" // Optional
    }
  ]
}
```

#### Notes

- Pull quotes and resources will be created as separate entries in Contentful and linked to the podcast episode
- The script includes debug mode (set by the `DEBUG` constant) for troubleshooting
- For cover art images, you must first upload the image to Contentful manually, then provide its Asset ID in the JSON file
- Episode numbers are displayed in the format "#42: Episode Title" when provided 