# Podcast Transcript to JSON Converter

This knowledge file contains instructions for processing podcast transcripts and generating structured JSON for import into Contentful.

## JSON Structure

The output should be a complete JSON object with the following structure:

```json
{
  "title": "Episode Title",
  "slug": "episode-slug", 
  "episodeNumber": "42", 
  "description": "Brief 1-2 sentence description",
  "summary": "Longer 3-4 sentence summary of the episode",
  "keyTopics": [
    "First key topic discussed",
    "Second key topic discussed",
    "Third key topic discussed"
  ],
  "guest": "Guest Name",
  "guestTitle": "Guest Position/Title",
  "publishDate": "2023-06-15",
  "duration": "XX min",
  "spotifyEmbedUrl": "",
  "coverArtId": "",
  "pullQuotes": [
    {
      "quote": "Notable quote from the episode",
      "attribution": "Who said it"
    },
    {
      "quote": "Another notable quote",
      "attribution": "Who said it"
    }
  ],
  "resourcesMentioned": [
    {
      "title": "Resource name",
      "url": "https://resource-url.com",
      "description": "Brief description of the resource"
    }
  ],
  "fullTranscript": "# Introduction\n\nTranscript text here...\n\n# Co-Founder Relationship\n\nMore transcript text...\n\n# Roles & Responsibilities\n\nMore transcript text...\n\n# First Customer\n\nMore transcript text...\n\n# Sales & Marketing\n\nMore transcript text...\n\n# Conclusion\n\nMore transcript text..."
}
```

## Required Processing Steps

When a user uploads a podcast transcript, you should:

1. Create an impactful title for the episode based on the content
2. Create a brief description that captures the essence of the episode
3. Write a 3-4 sentence summary that expands on the description 
4. Identify 4-6 key topics discussed in the episode
5. Extract the guest name and title/position
6. Determine the episode duration based on the timestamps (if available)
7. Leave spotifyEmbedUrl and coverArtId blank (these will be added later)
8. Find 2-3 notable quotes from the guest to use as pull quotes
9. List any books, websites, or resources mentioned
10. Format the transcript with Markdown headings (# Section Title) for major sections
11. Include the episodeNumber if it can be determined from the transcript

## Information Verification

Before finalizing the JSON, you must verify:
1. The spelling of the guest's name
2. The spelling of any company names mentioned
3. That the full transcript is included without any truncation
4. Request the URL to the company website (if not in transcript)

## Output Requirements

The final output should be the complete JSON object without truncation of any fields, especially the transcript. Format the output as valid JSON that can be saved directly to a file.

## Import Instructions

After providing the final JSON, include this reminder:

```
You can now:
1. Save this JSON to a file (e.g., episode.json)
2. Upload the cover art image to Contentful to get the coverArtId
3. Add the coverArtId to the JSON file
4. Run: node scripts/import-podcast.js scripts/data/podcast-episodes/episode.json
5. The episode will be created in Contentful with all linked resources
``` 