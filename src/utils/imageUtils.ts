/**
 * Utility functions for image handling
 */

type ImageFormatOption = 'webp' | 'jpg' | 'png' | 'avif';

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormatOption;
  fit?: 'fill' | 'scale' | 'crop' | 'thumb' | 'pad';
  focus?: 'center' | 'face' | 'faces' | 'top' | 'bottom' | 'right' | 'left';
}

/**
 * Transforms a Contentful image URL to include optimization parameters
 * 
 * @param url - The original Contentful image URL
 * @param options - Image transformation options
 * @returns Optimized image URL with transformation parameters
 */
export function getOptimizedImageUrl(url: string, options: ImageTransformOptions = {}): string {
  if (!url) return '';
  
  // Ensure URL starts with https:
  const baseUrl = url.startsWith('https:') ? url : `https:${url}`;
  
  // Default options
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'fill',
    focus = 'center'
  } = options;
  
  // Build query parameters
  const params = new URLSearchParams();
  params.append('fm', format);
  params.append('q', quality.toString());
  params.append('fit', fit);
  params.append('f', focus);
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Creates a responsive srcSet string for Contentful images
 * 
 * @param url - The original Contentful image URL
 * @param widths - Array of width breakpoints
 * @param options - Additional transformation options
 * @returns srcSet string for responsive images
 */
export function getResponsiveSrcSet(
  url: string, 
  widths: number[] = [640, 768, 1024, 1280, 1536, 1920],
  options: Omit<ImageTransformOptions, 'width'> = {}
): string {
  if (!url) return '';
  
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(url, { ...options, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
} 