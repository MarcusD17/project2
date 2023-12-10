    // Check the user's preference from local storage
    const darkModeOnLoad = localStorage.getItem('darkMode') === 'enabled';

    // Set initial mode based on user preference
    if (darkModeOnLoad) {
      document.body.classList.add('dark-mode');
    }

    function toggleDarkMode() {
      // Toggle the class on the body
      document.body.classList.toggle('dark-mode');

      // Update the user's preference in local storage
      const darkModeEnabled = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
    }