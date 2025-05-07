"use strict";

/**
 * Optimized search function that efficiently determines if input is a URL or search query
 * @param {string} input - User input from search bar
 * @param {string} template - Template for a search query
 * @returns {string} - Fully qualified URL
 */
function search(input, template) {
  // Early returns for empty input
  if (!input || !input.trim()) {
    return template.replace("%s", "");
  }
  
  // Quick pattern checks before expensive URL constructor
  const trimmedInput = input.trim();
  
  // Check if it's already a URL with protocol
  if (/^https?:\/\//i.test(trimmedInput)) {
    try {
      return new URL(trimmedInput).toString();
    } catch {
      // If URL constructor fails despite having protocol, continue to other checks
    }
  }
  
  // Check for common domain patterns before using URL constructor
  if (/^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(\/.*)*/i.test(trimmedInput)) {
    try {
      const url = new URL(`http://${trimmedInput}`);
      return url.toString();
    } catch {
      // Continue to search if URL construction fails
    }
  }
  
  // IP address pattern
  if (/^(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)*$/i.test(trimmedInput)) {
    try {
      const url = new URL(`http://${trimmedInput}`);
      return url.toString();
    } catch {
      // Continue to search if URL construction fails
    }
  }
  
  // Fallback to search
  return template.replace("%s", encodeURIComponent(trimmedInput));
}

// Cache common regex patterns
const URL_REGEX = {
  HAS_PROTOCOL: /^https?:\/\//i,
  DOMAIN_PATTERN: /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(\/.*)*/i,
  IP_ADDRESS: /^(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)*$/i
};

/**
 * Even more efficient search function with cached patterns
 * Use this version for maximum performance
 * 
 * @param {string} input - User input from search bar
 * @param {string} template - Template for a search query
 * @returns {string} - Fully qualified URL
 */
function searchFast(input, template) {
  // Early returns for empty input
  if (!input || !input.trim()) {
    return template.replace("%s", "");
  }
  
  const trimmedInput = input.trim();
  
  // Check if it's already a URL with protocol
  if (URL_REGEX.HAS_PROTOCOL.test(trimmedInput)) {
    try {
      return new URL(trimmedInput).toString();
    } catch {
      // If URL constructor fails despite having protocol, continue to other checks
    }
  }
  
  // Check for common domain patterns before using URL constructor
  if (URL_REGEX.DOMAIN_PATTERN.test(trimmedInput) || 
      URL_REGEX.IP_ADDRESS.test(trimmedInput)) {
    try {
      const url = new URL(`http://${trimmedInput}`);
      return url.toString();
    } catch {
      // Continue to search if URL construction fails
    }
  }
  
  // Fallback to search
  return template.replace("%s", encodeURIComponent(trimmedInput));
}

// Export both versions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { search, searchFast };
}
