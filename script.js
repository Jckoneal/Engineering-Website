// Optional: Parallax Effect
window.addEventListener("scroll", function() {
    const scrolled = window.pageYOffset;
    document.querySelector('.background-animation').style.backgroundPositionY = `${scrolled * 0.5}px`; // Slow parallax effect
  });
  