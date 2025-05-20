# Data Directory

This directory contains data files used by the utility scripts. These files are excluded from git via the `.gitignore` file to prevent committing potentially sensitive or large data files.

## Directory Structure

- `podcast-episodes/` - JSON files for podcast episodes to be imported into Contentful

## Usage

Place your data files in the appropriate subdirectory before running the related scripts. For example:

1. Create a podcast episode JSON file at `scripts/data/podcast-episodes/my-new-episode.json`
2. Run the import script:
   ```bash
   node scripts/import-podcast.js scripts/data/podcast-episodes/my-new-episode.json
   ```

## File Format Examples

See the main `scripts/README.md` file for detailed information about the expected format of data files. 