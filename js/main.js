document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
  const toggleButton = document.querySelector('.nav-toggle');
  const navLinks     = document.querySelector('.nav-links');
  console.log({ toggleButton, navLinks });

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      console.log('toggled menu, open =', navLinks.classList.contains('open'));
    });
  }
});
