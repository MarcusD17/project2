// darkmode.js (on all pages)

let isDarkMode;

// Function to toggle dark mode and set preference in local storage
function toggleDarkMode() {
  const body = document.body;
  isDarkMode = !body.classList.contains('dark-mode'); // Invert the current state

  // Apply dark mode to the body
  body.classList.toggle('dark-mode', isDarkMode);

  // Save dark mode preference in local storage
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

  // Change the button's image based on dark mode state
  updateDarkModeImage();

  // Broadcast the dark mode change to other pages
  window.postMessage({ type: 'darkMode', isDarkMode }, '*');
}

// Function to apply dark mode preference from local storage
function applyDarkModePreference() {
  const darkModeLocalStorage = localStorage.getItem('darkMode');
  isDarkMode = darkModeLocalStorage === 'enabled';

  // Apply dark mode to the body
  document.body.classList.toggle('dark-mode', isDarkMode);

  // Change the button's image based on dark mode state
  updateDarkModeImage();
}

// Function to update the dark mode button image
function updateDarkModeImage() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle img');
    if (darkModeToggle) {
      darkModeToggle.src = isDarkMode ? '/images/moon.png' : '/images/moonlight.png';
    }
}

// Apply dark mode preference on page load
window.addEventListener('load', applyDarkModePreference);

// Listen for dark mode changes from other pages
window.addEventListener('message', function (event) {
  if (event.data.type === 'darkMode') {
    applyDarkModePreference();
  }
});

// Initial application of dark mode preference
applyDarkModePreference();
