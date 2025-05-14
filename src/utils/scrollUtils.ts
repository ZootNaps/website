/**
 * Utility functions for scroll-related operations
 */

/**
 * Scrolls to an element with an offset to prevent content from being too close to the navbar
 * @param elementId - The ID of the element to scroll to
 * @param offset - The offset in pixels (default: 50px)
 */
export const scrollToElement = (elementId: string, offset: number = 50) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}; 