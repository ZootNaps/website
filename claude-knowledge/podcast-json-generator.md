# Podcast Transcript to JSON Converter

This knowledge file contains instructions for processing podcast transcripts and generating structured JSON for import into Contentful.

## IMPORTANT: Complete Transcript Coverage

**The transcriptSections must collectively contain the ENTIRE transcript content with absolutely no omissions.** Every word spoken in the original transcript must be included in one of the sections. This is critical for maintaining a complete record of the conversation.

## Pre-Processing Workflow

Before generating the JSON structure, follow these steps:
1. **Complete Instructions Review**: Read through the entire instruction document fully
2. **Complete Transcript Review**: Read through the entire transcript first
3. **Identify Key Moments**: While reviewing, mark:
   - 3-4 compelling pull quotes (memorable statements, key insights, statistics, personal stories)
   - Natural topic transitions for section breaks
   - Key insights for the summary section
4. **Plan Section Organization**: 
   - Use this framework as a guide for organizing sections:
     - Introduction (who the guest is, initial question)
     - Background/Problem (guest's background, problem they're solving)
     - Main Topic #1 (first major discussion point)
     - Main Topic #2 (second major discussion point)
     - Challenges/Lessons (difficulties faced, lessons learned)
     - Conclusion/Resources (wrap-up, where to find the guest)
   - Adapt this framework based on the actual content of the episode
   - Not every episode will contain all these sections
   - Replace generic labels (Main Topic #1) with specific topics actually discussed
   - Create descriptive titles that accurately reflect the content of each section
5. **Clean Up the Transcript**:
   - Fix any transcription errors
   - Break long paragraphs into smaller chunks
   - Remove filler words and false starts when appropriate
   - Ensure speaker names are consistent throughout
6. **Ask for the name of the Guest prior to creating the JSON to ensure accurate spelling.**

## Speaker Formatting Guidelines

In the transcriptSections content, format speaker dialogue consistently:

- Bold the speaker names: `**Gus:**` and `**Guest:**` (or the actual guest name)
- Include a space after the colon
- Start a new paragraph for each speaker change
- Example:
  ```
  **Gus:** What inspired you to start your company?
  
  **Guest:** I noticed a gap in the market that wasn't being addressed...
  ```

## Information Verification

Before starting to create the JSON, verify the following with the user:
1. The spelling of the guest's name
2. The spelling of the guest's company's name


Before finalizing the JSON, you MUST verify the following:
1. Confirm that every part of the original transcript appears in one of the transcriptSections
2. The spelling of the guest's name is correct throughout each of the transcriptSections
3. The spelling of any company names mentioned is correct throughout each of the transcriptSections
4. That the full transcript is included without any truncation
5. Request the URL to the company website (if not in transcript)



## Output Requirements

The final output should be a downloadable artifact. It must be a JSON object without truncation of any fields, especially the transcript sections. Format the output as valid JSON that can be saved directly to a file.

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
  "transcriptSections": [
    {
      "title": "Introduction",
      "content": "**Gus:** Welcome to the show...\n\n**Guest:** Thank you for having me...",
      "id": "introduction"
    },
    {
      "title": "Background",
      "content": "**Gus:** How did you get started in this industry?\n\n**Guest:** My journey began when...",
      "id": "background"
    },
    {
      "title": "Finding Product-Market Fit",
      "content": "**Gus:** When did you know you had found product-market fit?\n\n**Guest:** There was a defining moment when...",
      "id": "finding-product-market-fit"
    },
    {
      "title": "Key Challenges",
      "content": "**Gus:** What obstacles did you face along the way?\n\n**Guest:** The biggest challenge was...",
      "id": "key-challenges"
    },
    {
      "title": "Conclusion",
      "content": "**Gus:** Thanks for sharing your story...\n\n**Guest:** It's been a pleasure...",
      "id": "conclusion"
    }
  ]
}
```

> Note: The `fullTranscript` field is no longer required as it can be generated programmatically by combining all section content if needed.

## Required Processing Steps

When a user uploads a podcast transcript, you should:

1. **Create an impactful title**: Generate a compelling title that captures the main value proposition of the episode. The title should be concise yet descriptive of the core topic.

2. **Create a brief description**: Write 2-3 sentences that focus on what the reader will gain from the episode. Include relevant keywords naturally. This serves as the "Blog Post Excerpt" that will appear in blog listings.

3. **Write a detailed summary**: Create a 3-4 sentence summary that expands on the description and highlights the value of listening to the episode. This will appear in the episode summary section.

4. **Identify key topics**: Extract 4-6 specific, actionable key topics discussed in the episode. These should be written as bullet points that entice readers to listen.

5. **Extract guest information**: Accurately identify the guest's name and title/position, ensuring correct spelling.

6. **Determine episode duration**: Calculate based on timestamps if available.

7. **Leave technical fields blank**: spotifyEmbedUrl and coverArtId will be added later.

8. **Select powerful pull quotes**: Choose 2-3 notable quotes using these criteria:
   - Memorable, quotable statements
   - Key insights or advice
   - Statistics or surprising facts
   - Personal stories that illustrate broader points

9. **List resources mentioned**: Identify any books, websites, tools, or resources mentioned in the episode, including links when available.

10. **Structure the transcript content**: 
    
    a. **Identify logical sections**: 
       - Use the recommended section framework (Introduction, Background, Main Topics, Challenges, Conclusion)
       - Adapt the framework based on the actual content in the transcript
       - Replace generic section names with specific, descriptive titles that reflect the actual topics
       - Each section should focus on a cohesive topic or theme within the episode
       - Not every episode will contain all the suggested sections
    
    b. **Create transcriptSections**: For each identified section:
       - Use a clear, descriptive title that reflects the specific content of that section
       - Extract the section content with speaker names in bold, where the host is always "**Gus:**"
       - Generate an id in kebab-case format (lowercase with hyphens) based on the section title
       - Ensure all speaker dialogue is properly formatted with speaker name in bold followed by their words
       - **CRITICAL**: Make sure all transcript content is included in the sections; no dialogue should be omitted
       - Make sure all transcript content is included in the sections; no dialogue should be omitted
11. **Include episode number**: Add if it can be determined from the transcript.

## Complete Transcript Coverage Check

Before finalizing the JSON, perform this verification:
1. Confirm that every part of the original transcript appears in one of the transcriptSections
2. Check that there are no gaps in the conversation between sections
3. Verify that the beginning and ending of the original transcript are captured in the appropriate sections
4. Ensure all speaker turns are preserved with proper attribution

## Speaker Formatting Guidelines

In the transcriptSections content, format speaker dialogue consistently:

- Bold the speaker names: `**Gus:**` and `**Guest:**` (or the actual guest name)
- Include a space after the colon
- Start a new paragraph for each speaker change
- Example:
  ```
  **Gus:** What inspired you to start your company?
  
  **Guest:** I noticed a gap in the market that wasn't being addressed...
  ```

## Information Verification

Before finalizing the JSON, you MUST verify:
1. The spelling of the guest's name
2. The spelling of any company names mentioned
3. That the full transcript is included without any truncation
4. Request the URL to the company website (if not in transcript)

## Output Requirements

The final output should be a downloadable artifact. It must be a JSON object without truncation of any fields, especially the transcript sections. Format the output as valid JSON that can be saved directly to a file.