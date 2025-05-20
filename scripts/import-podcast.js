require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');
const fs = require('fs');

// Enable debug mode to see more details
const DEBUG = true;

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
    
    // First, let's try to fetch the content type to see what fields are available
    if (DEBUG) {
      try {
        const contentType = await environment.getContentType('podcastEpisode');
        console.log('Content type structure:');
        contentType.fields.forEach(field => {
          console.log(`- ${field.id} (${field.type}${field.required ? ', required' : ''})`);
        });
      } catch (e) {
        console.error('Error fetching content type:', e.message);
      }
    }
    
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
    };
    
    // Conditionally add guestTitle if it exists in your data
    if (podcastData.guestTitle) {
      fields.guestTitle = { 'en-US': podcastData.guestTitle };
    }
    
    // Add episodeNumber if it exists
    if (podcastData.episodeNumber) {
      fields.episodeNumber = { 'en-US': podcastData.episodeNumber };
    }
    
    // Add optional fields if they exist
    if (podcastData.spotifyEmbedUrl) {
      fields.spotifyEmbedUrl = { 'en-US': podcastData.spotifyEmbedUrl };
    }
    
    // Add coverArt if provided
    // Note: The coverArt should be uploaded manually to Contentful before running the import
    // This script will link to the existing asset, not upload it
    if (podcastData.coverArtId) {
      fields.coverArt = { 
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: podcastData.coverArtId
          }
        } 
      };
    }
    
    if (podcastData.fullTranscript) {
      // For now, we'll use a simple document with the transcript as plain text
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
    
    if (DEBUG) {
      console.log('Fields being sent to Contentful:');
      console.log(JSON.stringify(Object.keys(fields), null, 2));
    }
    
    // Create the podcast episode entry - try with minimal fields first if in debug mode
    let podcastEntry;
    
    if (DEBUG) {
      try {
        // First try with just the most basic fields
        console.log('Attempting to create entry with minimal fields...');
        const minimalFields = {
          title: fields.title,
          slug: fields.slug,
          description: fields.description, 
          summary: fields.summary,
          keyTopics: fields.keyTopics,
          guest: fields.guest,
          duration: fields.duration
        };
        
        // Add episodeNumber to minimal fields if it exists
        if (fields.episodeNumber) {
          minimalFields.episodeNumber = fields.episodeNumber;
        }
        
        console.log('Minimal fields:', Object.keys(minimalFields));
        
        podcastEntry = await environment.createEntry('podcastEpisode', {
          fields: minimalFields
        });
        
        console.log('Basic entry created successfully. Adding remaining fields...');
        
        // Now add all the fields to the existing entry
        for (const key of Object.keys(fields)) {
          if (!minimalFields[key]) {
            podcastEntry.fields[key] = fields[key];
          }
        }
        
        podcastEntry = await podcastEntry.update();
      } catch (error) {
        console.error('Error with minimal fields approach:', error.message);
        
        // Try with all fields as originally intended
        console.log('Falling back to creating entry with all fields at once...');
        podcastEntry = await environment.createEntry('podcastEpisode', {
          fields: fields
        });
      }
    } else {
      // Normal non-debug approach
      podcastEntry = await environment.createEntry('podcastEpisode', {
        fields: fields
      });
    }
    
    // Publish the podcast episode
    await podcastEntry.publish();
    
    console.log(`Successfully imported podcast: ${podcastData.title}`);
    console.log(`Entry ID: ${podcastEntry.sys.id}`);
    console.log(`View in Contentful: https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries/${podcastEntry.sys.id}`);
    
  } catch (error) {
    console.error('Error importing podcast:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response status text:', error.response.statusText);
      
      if (error.response.data) {
        console.error('Error details:', JSON.stringify(error.response.data, null, 2));
        
        if (error.response.data.details && error.response.data.details.errors) {
          console.error('Specific validation errors:');
          error.response.data.details.errors.forEach((err, idx) => {
            console.error(`Error ${idx + 1}:`, JSON.stringify(err, null, 2));
          });
        }
      }
      
      if (error.response.config) {
        console.error('Request URL:', error.response.config.url);
        console.error('Request method:', error.response.config.method);
        if (error.response.config.payloadData) {
          try {
            const payload = JSON.parse(error.response.config.payloadData);
            console.error('Fields that were sent:', Object.keys(payload.fields).join(', '));
          } catch (e) {
            console.error('Could not parse request payload');
          }
        }
      }
    }
  }
}

importPodcast().catch(error => {
  console.error('Unhandled error:', error);
}); 