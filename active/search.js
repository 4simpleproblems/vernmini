"use strict";

// Cache common regex patterns outside the function
// This prevents recompilation on every call, boosting performance.
const URL_REGEX = {
    // Checks if the input starts with http:// or https://
    HAS_PROTOCOL: /^https?:\/\//i,
    // Checks for common domain patterns (e.g., example.com, sub.domain.co.uk, including paths)
    DOMAIN_PATTERN: /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(\/.*)*/i,
    // Checks for IPv4 address patterns (e.g., 192.168.1.1, including ports and paths)
    // Note: This regex is a quick structural check, new URL() validates the ranges.
    IP_ADDRESS: /^(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)*$/i
};

/**
 * Highly efficient search function that determines if input is a URL or search query.
 * It prioritizes URL parsing attempts before falling back to a search query.
 *
 * @param {string} input - User input from search bar (e.g., "google.com", "how to optimize js", "https://example.com")
 * @param {string} template - Template for a search query URL (e.g., "https://duckduckgo.com/?q=%s")
 * @returns {string} - A fully qualified URL, either the parsed input URL or the search query URL.
 */
function searchFast(input, template) {
    // Trim leading/trailing whitespace
    const trimmedInput = input ? input.trim() : '';

    // Early return for empty or whitespace-only input
    // Returning the template with an empty query might navigate to the search engine's homepage.
    if (!trimmedInput) {
        return template.replace("%s", "");
    }

    // --- Attempt 1: Check if it already has a protocol (like http:// or https://) ---
    if (URL_REGEX.HAS_PROTOCOL.test(trimmedInput)) {
        try {
            // Use the native URL constructor to validate and normalize the URL.
            // This is robust but can throw errors for invalid URL strings.
            return new URL(trimmedInput).toString();
        } catch {
            // If URL constructor fails despite having a protocol,
            // it's likely malformed. Treat as a search query in this case.
             console.warn("Input with protocol treated as search due to URL validation error:", trimmedInput);
            // Fall through to the search query handling below.
        }
    }

    // --- Attempt 2: Check if it looks like a domain or IP address and prepend http:// ---
    // We combine the domain and IP checks as they both lead to prepending http://
    if (URL_REGEX.DOMAIN_PATTERN.test(trimmedInput) || URL_REGEX.IP_ADDRESS.test(trimmedInput)) {
        try {
            // Prepend http:// and try the URL constructor.
            // Browsers often try HTTPS first implicitly, but for explicit validation,
            // starting with HTTP is a common fallback strategy before considering it a search.
            const url = new URL(`http://${trimmedInput}`);
            return url.toString();
        } catch {
            // If prepending http:// still results in an invalid URL, treat as search.
             console.warn("Input treated as search after failing http:// prepending:", trimmedInput);
            // Fall through to the search query handling below.
        }
    }

     // --- Attempt 3: Final fallback - Treat as a search query ---
     // If none of the URL patterns matched or URL construction failed, assume it's a search query.
     if (template && template.includes("%s")) {
        return template.replace("%s", encodeURIComponent(trimmedInput));
     } else {
         // Handle case where template is missing or invalid (shouldn't happen with correct setup)
         console.error("Search template is invalid:", template);
         // Return input as is, or a default error page URL if available
         return `about:blank#error=invalid_search_template&query=${encodeURIComponent(trimmedInput)}`;
     }
}

// Make searchFast globally available as expected by the HTML script(s)
window.searchFast = searchFast;

// Note: The original code included a Node.js module.exports block.
// This is not necessary for a browser script loaded via <script>.
// It has been removed for clarity in a browser-only context.
