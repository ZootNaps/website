# API Reference

This document outlines the API endpoints available in the South Lamar Studios website.

## API Overview

The website implements several API routes using Next.js API Routes functionality. These endpoints provide functionality for contact form submission and sitemap generation.

## Authentication

Most API endpoints do not require authentication as they are designed for public use. For any protected endpoints, the authentication method will be specified.

## Base URL

For local development: `http://localhost:3000/api`
For production: `https://southlamarstudios.com/api`

## API Endpoints

### Contact Form

#### Submit Contact Form

Send a message through the contact form.

**URL**: `/api/contact`

**Method**: `POST`

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services."
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully."
  }
  ```

**Error Response**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "success": false,
    "message": "Please fill in all required fields."
  }
  ```

- **Code**: 500 Internal Server Error
- **Content**:
  ```json
  {
    "success": false,
    "message": "Failed to send message. Please try again later."
  }
  ```

**Implementation Notes**:

The contact form API uses Nodemailer to send emails. The request is validated for required fields before processing.

### Sitemap

#### Server Sitemap XML

Generates a dynamic XML sitemap for search engines.

**URL**: `/api/server-sitemap.xml`

**Method**: `GET`

**Success Response**:

- **Code**: 200 OK
- **Content-Type**: `application/xml`
- **Content**: XML formatted sitemap following the [sitemap protocol](https://www.sitemaps.org/protocol.html)

**Implementation Notes**:

The sitemap is dynamically generated based on available routes and content from Contentful. It includes:

- Static pages
- Blog posts
- Other dynamic content

## Internal API Helpers

### Contentful API

While not exposed as public endpoints, the application uses internal helper functions to interact with the Contentful API:

#### Get Blog Posts

```typescript
import { getAllBlogPosts } from '@/lib/contentful';

// Usage in a Server Component
const posts = await getAllBlogPosts();
```

#### Get Blog Post by Slug

```typescript
import { getBlogPostBySlug } from '@/lib/contentful';

// Usage in a Server Component
const post = await getBlogPostBySlug('example-post');
```

These functions communicate with Contentful's Content Delivery API and transform the responses into structured data for the application.

## Error Handling

All API endpoints follow a consistent error handling pattern:

1. Validate request data
2. Process the request in a try/catch block
3. Return appropriate HTTP status codes and error messages

Error responses follow this structure:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Optional technical details"
}
```

## Rate Limiting

No explicit rate limiting is implemented in the API endpoints. However, consideration should be given to adding rate limiting for production to prevent abuse, especially for the contact form endpoint.

## CORS Configuration

The API endpoints are configured to accept requests from the same origin. Cross-Origin Resource Sharing (CORS) is not explicitly enabled for external domains.

## Webhook Support

The application does not currently expose webhook endpoints. If integrating with external services that require webhooks, new API routes would need to be implemented.

## API Evolution

When making changes to the API:

1. Maintain backward compatibility where possible
2. Document changes clearly
3. Consider versioning for breaking changes

## Testing the API

### Using cURL

```bash
# Test contact form submission
curl -X POST https://southlamarstudios.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message"}'
```

### Using Postman

1. Set the request URL to the desired endpoint
2. Set the appropriate HTTP method
3. Add required headers and body content
4. Send the request and review the response 