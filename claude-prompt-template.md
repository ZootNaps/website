# Claude Prompt for Podcast JSON Generation

Copy and paste the following prompt to Claude along with your podcast transcript:

```
Please convert this podcast transcript into a structured JSON object with the following format:

{
  "title": "Episode Title",
  "slug": "episode-slug", // Optional, will be generated from title if not provided
  "episodeNumber": "42", // Optional, will be displayed as #42: Episode Title
  "description": "Brief 1-2 sentence description",
  "summary": "Longer 3-4 sentence summary of the episode",
  "keyTopics": [
    "First key topic discussed",
    "Second key topic discussed",
    "Third key topic discussed",
    "Fourth key topic discussed",
    "Fifth key topic discussed"
  ],
  "guest": "Guest Name",
  "guestTitle": "Guest Position/Title",
  "publishDate": "2023-06-15", // ISO format date
  "duration": "XX min",
  "spotifyEmbedUrl": "",
  "coverArtId": "", // Will add this later after uploading to Contentful
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

Instructions:
1. Extract the title from the podcast content
2. Create a brief description that captures the essence of the episode
3. Write a 3-4 sentence summary that expands on the description 
4. Identify 4-6 key topics discussed in the episode
5. Extract the guest name and title/position
6. Determine the episode duration if mentioned
7. Leave spotifyEmbedUrl and coverArtId blank (I'll add these later)
8. Find 2-3 notable quotes from the guest to use as pull quotes
9. List any books, websites, or resources mentioned
10. Format the transcript with Markdown headings (# Section Title) for major sections
11. Include the episodeNumber if it can be determined from the transcript

Before finalizing the JSON, please:
1. Ask me to verify the spelling of the guest's name
2. Ask me to verify the spelling of any company names mentioned
3. Confirm that the full transcript is included without any truncation

The final output should be the complete JSON object without truncation of any fields, especially the transcript.
```

## After Getting the Initial JSON from Claude

Claude will ask you to verify:
1. The guest's name spelling (confirm this is 100% correct)
2. Company name spelling (confirm this is 100% correct)
3. That the transcript is complete without any truncation

Once you've provided this verification, Claude will give you the final JSON.

## Next Steps After Receiving the Final JSON

1. Save the JSON to a file in the scripts/data/podcast-episodes directory
2. Upload the cover art to Contentful and get its Asset ID
3. Add the coverArtId to the JSON file
4. Run the import script:

```
node scripts/import-podcast.js scripts/data/podcast-episodes/your-episode.json
``` 