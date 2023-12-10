setInterval(function() {
    const slideTrack = document.querySelector('.slide-track');
    slideTrack.appendChild(slideTrack.firstElementChild);
  }, 5000); // Change slide every 5 seconds