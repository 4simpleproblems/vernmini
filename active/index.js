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

// Attach form submit event listener
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
  
  const url = search(address.value, searchEngine.value);
  
  // Instead of redirecting with UV prefix, load search.html with URL as parameter
  location.href = `search.html?url=${encodeURIComponent(url)}`;
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

// Initialize clock if it exists
document.addEventListener('DOMContentLoaded', () => {
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    updateClock();
    setInterval(updateClock, 1000);
  }
});
