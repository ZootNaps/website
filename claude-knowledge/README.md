# Claude Knowledge Files

This directory contains knowledge files for Claude AI to help automate common tasks for the website project.

## What Are Knowledge Files?

Knowledge files are markdown documents that contain detailed instructions for Claude. When attached to a Claude conversation, these files act as a sort of "memory" that helps Claude perform specific tasks without needing lengthy prompts.

## Available Knowledge Files

Currently, the following knowledge files are available:

### 1. Podcast JSON Generator
- **File**: `podcast-json-generator.md`
- **Purpose**: Converts podcast transcripts into structured JSON for Contentful import
- **How to use**: See `how-to-use-podcast-json-generator.md`

## How to Use Knowledge Files with Claude

1. Start a new Claude conversation
2. Click the paperclip icon (or upload button)
3. Select either:
   - The entire `.claude-knowledge` folder to make all knowledge available
   - A specific `.md` file for a single task
4. Use a simple prompt relevant to the task
5. Claude will access the instructions in the knowledge file and follow them

## Benefits of Using Knowledge Files

- **Simplified Prompts**: No need for lengthy, complex prompts
- **Consistency**: Tasks are performed the same way every time
- **Efficiency**: Save time by eliminating repetitive instructions
- **Maintainability**: Update instructions in one place

## Adding New Knowledge Files

To add a new knowledge file:

1. Create a new `.md` file in this directory
2. Use clear structure with headings and lists
3. Include detailed instructions for Claude
4. Add the new file to this README 