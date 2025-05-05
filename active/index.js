"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

// Register service worker once on page load to avoid multiple registrations
let serviceWorkerRegistered = false;
async function ensureServiceWorkerRegistered() {
  if (!serviceWorkerRegistered) {
    try {
      await registerSW();
      serviceWorkerRegistered = true;
    } catch (err) {
      error.textContent = "Failed to register service worker.";
      errorCode.textContent = err.toString();
      throw err;
    }
  }
}

// Run this as soon as possible
ensureServiceWorkerRegistered();

// Attach form submit event listener
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    // Make sure service worker is registered
    await ensureServiceWorkerRegistered();
    
    // Get the URL to navigate to
    const url = search(address.value, searchEngine.value);
    
    // Navigate to search page with URL parameter
    window.location.href = `search.html?url=${encodeURIComponent(url)}`;
  } catch (err) {
    console.error("Navigation error:", err);
  }
});

// Autofill function with auto-submit
function autofill(url) {
  address.value = url;
  form.requestSubmit(); // Automatically submit the form
}

// Add clock functionality
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.textContent = timeString;
  }
}

// Initialize clock as soon as possible
document.addEventListener('DOMContentLoaded', () => {
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    updateClock();
    setInterval(updateClock, 1000);
  }
});
