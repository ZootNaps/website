# How to Generate Podcast JSON Using Claude

This guide explains how to use Claude to convert your podcast transcripts into structured JSON for importing into Contentful.

## Quick Start

1. Create a new Claude conversation
2. Attach your `.claude-knowledge` folder or this specific knowledge file
3. Upload your podcast transcript file or paste the transcript text
4. Use a simple prompt like: "Please convert this podcast transcript to JSON for Contentful import"

Claude will:
- Analyze the transcript
- Extract all relevant information
- Verify critical information with you
- Generate a complete, valid JSON file ready for import

## Example Minimal Prompt

```
Please convert this podcast transcript to JSON for Contentful import.
```

That's it! Claude will process your transcript and handle all the complexity of formatting and extracting information based on the knowledge file instructions.

## Verification Steps

Claude will ask you to verify:
1. The spelling of the guest's name
2. The spelling of any company names mentioned
3. That the full transcript is included without truncation
4. URLs for any resources mentioned

Simply respond to Claude's verification questions to complete the process.

## Next Steps After Receiving JSON

1. Save the JSON to a file (e.g., `episode.json`)
2. Upload the episode cover art to Contentful
3. Get the Contentful Asset ID for the cover art
4. Add the cover art ID to the JSON file
5. Run the import script:
   ```
   node scripts/import-podcast.js scripts/data/podcast-episodes/episode.json
   ```

The episode will be created in Contentful with all linked resources. 