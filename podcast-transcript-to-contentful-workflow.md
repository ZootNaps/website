# Podcast Transcript to Contentful Workflow

This document guides Claude on how to process podcast transcripts and generate structured JSON for import into Contentful. The workflow is designed to require minimal user input by extracting as much information as possible from the transcript and then prompting for any missing elements.

## Workflow Overview

1. User provides a podcast transcript
2. Claude analyzes the transcript to extract all possible information
3. Claude identifies missing required fields
4. Claude prompts user for specific missing information
5. Claude **explicitly verifies guest name and company spelling**
6. Claude **ensures the full transcript is included without truncation**
7. Claude generates a final JSON object ready for import
8. User saves the JSON and runs the import script

## Information Extraction Guide

When analyzing a podcast transcript, Claude should attempt to extract the following:

### Automatically Extractable Information

| Field | Extraction Tips |
|-------|----------------|
| Title | Often mentioned at the beginning or in introduction. Look for "Welcome to [Title]" or similar phrases. |
| Episode Number | Look for mentions like "Episode 42" or "#42" in the introduction. |
| Guest Name | Typically introduced near the beginning of the podcast. **Verify spelling with user before finalizing.** |
| Guest Title | Usually mentioned alongside the guest's name in the introduction. **Verify company spelling with user.** |
| Description | Synthesize based on main topics discussed. |
| Summary | Expand on the description using key points from the episode. |
| Key Topics | Identify 4-6 main themes or subjects discussed throughout the transcript. |
| Pull Quotes | Look for impactful, quotable statements from the guest. |
| Resources Mentioned | Identify books, websites, tools, or other resources mentioned. |
| Duration | Sometimes mentioned at the beginning or end, but often not in the transcript. |

### Information That Typically Requires User Input

| Field | Notes |
|-------|-------|
| Spotify Embed URL | This almost always requires user input as it's not in the transcript. |
| Duration | If not mentioned in transcript, ask user. |
| Publish Date | If not mentioned in transcript, ask user or default to current date. |
| Missing Resources | URLs for mentioned resources often need to be provided by the user. |
| Cover Art ID | The ID of the cover art image uploaded to Contentful. |

## Verification Steps

Before finalizing the JSON, Claude must:

1. **Explicitly verify the guest's name spelling**: "Is the spelling of the guest's name '[Guest Name]' correct?"
2. **Explicitly verify company name spelling**: "Is the spelling of the company '[Company Name]' correct?"
3. **Check that the entire transcript is included**: Confirm there's no truncation and all sections are present

## Prompt Strategy

After analyzing the transcript, Claude should:

1. Show what information was successfully extracted
2. List specific missing information that's needed
3. Ask targeted questions to collect missing information
4. **Explicitly verify guest name and company spelling**
5. **Confirm the transcript is complete without truncation**
6. Present the final JSON with all information incorporated

## Example Prompting Flow

```
Based on the transcript, I've extracted most of the required information:

✅ Title: "Building a SaaS Business from Scratch"
✅ Episode Number: 42
✅ Guest: Sarah Johnson
✅ Guest Title: CEO of CloudTech
✅ Key Topics: (5 topics identified)
✅ Description and Summary created
✅ Pull Quotes: (2 quotes extracted)
✅ Resources: "The Lean Startup" book mentioned

However, I need a few more details to complete the JSON:

1. What is the Spotify embed URL for this episode?
2. What is the duration of this episode (if known)?
3. I noticed "CloudTech Website" was mentioned. Do you have the URL for it?

Before finalizing, I need to verify:
- Is the spelling of the guest's name "Sarah Johnson" correct?
- Is the spelling of the company name "CloudTech" correct?
- I've included the full transcript in the JSON - please confirm it's complete and not truncated.

Once you provide these details, I'll generate the complete JSON ready for import.
```

## Final Output Format

After collecting all necessary information, Claude should output a complete, valid JSON object following the structure in the [example-podcast.json](example-podcast.json) file, without any surrounding explanation text.

## Handling Special Cases

- If proper headings for transcript sections can't be determined, group content by themes using standard headings: Introduction, Main Discussion, Conclusion
- If no resources are mentioned, leave resourcesMentioned as an empty array
- If unable to extract meaningful pull quotes, ask the user to suggest some

## Import Instructions Reminder

After providing the final JSON, Claude should include a brief reminder about importing:

```
You can now:
1. Save this JSON to a file (e.g., episode.json)
2. Upload the cover art image to Contentful to get the coverArtId
3. Add the coverArtId to the JSON file
4. Run: node scripts/import-podcast.js scripts/data/podcast-episodes/episode.json
5. The episode will be created in Contentful with all linked resources
``` 