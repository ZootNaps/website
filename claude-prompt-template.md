# Claude Prompt for Podcast JSON Generation

Copy and paste the following prompt to Claude along with your podcast transcript:

```
Please convert this podcast transcript into a structured JSON object with the following format:

{
  "title": "Episode Title",
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
  "duration": "XX min",
  "spotifyEmbedUrl": "",
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
7. Leave spotifyEmbedUrl blank (I'll add this later)
8. Find 2-3 notable quotes from the guest to use as pull quotes
9. List any books, websites, or resources mentioned
10. Format the transcript with Markdown headings (# Section Title) for major sections

Please output ONLY the JSON object without any explanation or additional text.
```

## After Getting the JSON from Claude

1. Save the JSON to a file (e.g., `episode.json`)
2. Run the import script to create the episode in Contentful:

```
npm install contentful-management dotenv
node import-podcast.js episode.json
```

3. Add the Spotify embed URL later through the Contentful web interface or by updating and re-importing the JSON 