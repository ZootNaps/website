require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');
const fs = require('fs');

// Read the JSON file provided as an argument
const jsonFilePath = process.argv[2];
if (!jsonFilePath) {
  console.error('Please provide a path to a JSON file');
  process.exit(1);
}

const podcastData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Initialize the Contentful client
const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

async function importPodcast() {
  try {
    console.log('Starting import process...');
    
    // Get space and environment
    console.log(`Connecting to space ${process.env.CONTENTFUL_SPACE_ID}...`);
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');
    console.log('Connected to Contentful successfully!');
    
    // Create pull quotes first (referenced content)
    console.log('Creating pull quotes...');
    const pullQuoteEntries = [];
    for (const quote of podcastData.pullQuotes || []) {
      console.log(`Creating pull quote: "${quote.quote.substring(0, 30)}..."`);
      const entry = await environment.createEntry('pullQuote', {
        fields: {
          quote: { 'en-US': quote.quote },
          attribution: { 'en-US': quote.attribution }
        }
      });
      await entry.publish();
      console.log(`Published pull quote with ID: ${entry.sys.id}`);
      pullQuoteEntries.push({
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: entry.sys.id
        }
      });
    }
    
    // Create resources mentioned
    console.log('Creating resources mentioned...');
    const resourceEntries = [];
    for (const resource of podcastData.resourcesMentioned || []) {
      console.log(`Creating resource: ${resource.title}`);
      const entry = await environment.createEntry('resource', {
        fields: {
          title: { 'en-US': resource.title },
          url: { 'en-US': resource.url },
          description: resource.description ? { 'en-US': resource.description } : undefined
        }
      });
      await entry.publish();
      console.log(`Published resource with ID: ${entry.sys.id}`);
      resourceEntries.push({
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: entry.sys.id
        }
      });
    }
    
    // Create slug from title if not provided
    const slug = podcastData.slug || podcastData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    console.log(`Creating podcast episode: "${podcastData.title}" with slug "${slug}"`);
    
    // Prepare the fields object with required fields
    const fields = {
      title: { 'en-US': podcastData.title },
      slug: { 'en-US': slug },
      description: { 'en-US': podcastData.description },
      summary: { 'en-US': podcastData.summary },
      keyTopics: { 'en-US': podcastData.keyTopics },
      publishDate: { 'en-US': podcastData.publishDate || new Date().toISOString() },
      duration: { 'en-US': podcastData.duration },
      guest: { 'en-US': podcastData.guest },
      guestTitle: { 'en-US': podcastData.guestTitle },
    };
    
    // Add optional fields if they exist
    if (podcastData.spotifyEmbedUrl) {
      fields.spotifyEmbedUrl = { 'en-US': podcastData.spotifyEmbedUrl };
    }
    
    if (podcastData.fullTranscript) {
      // For now, we'll use a simple document with the transcript as plain text
      // In a real implementation, you would use a proper Markdown to Rich Text converter
      fields.fullTranscript = { 
        'en-US': {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: podcastData.fullTranscript,
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        }
      };
    }
    
    // Add references if they exist
    if (pullQuoteEntries.length > 0) {
      fields.pullQuotes = { 'en-US': pullQuoteEntries };
    }
    
    if (resourceEntries.length > 0) {
      fields.resourcesMentioned = { 'en-US': resourceEntries };
    }
    
    // Create the podcast episode entry
    const podcastEntry = await environment.createEntry('podcastEpisode', {
      fields: fields
    });
    
    // Publish the podcast episode
    await podcastEntry.publish();
    
    console.log(`Successfully imported podcast: ${podcastData.title}`);
    console.log(`Entry ID: ${podcastEntry.sys.id}`);
    console.log(`View in Contentful: https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries/${podcastEntry.sys.id}`);
    
  } catch (error) {
    console.error('Error importing podcast:', error.message);
    if (error.response) {
      console.error('Response details:', error.response.data);
    }
  }
}

importPodcast().catch(error => {
  console.error('Unhandled error:', error);
}); 