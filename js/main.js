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
  // Space-themed animated background for hero section
  const canvas = document.getElementById('space-bg');
  const heroSection = document.querySelector('.hero-section');
  if (canvas && heroSection) {
    const ctx = canvas.getContext('2d');
    const starCount = 100;
    const planetCount = 15;
    let stars = [];
    let planets = [];
    function createStarsAndPlanets() {
      stars = Array.from({length: starCount}, () => {
        const r = Math.random() * 2 + 2;
        return {
          x: Math.random() * (canvas.width - 2 * r) + r,
          y: Math.random() * (canvas.height - 2 * r) + r,
          r,
          speedY: Math.random() * 0.5 + 0.2
        };
      });
      planets = Array.from({length: planetCount}, (_, i) => {
        const r = Math.random() * 18 + 18;
        return {
          x: Math.random() * (canvas.width - 2 * r) + r,
          y: Math.random() * (canvas.height - 2 * r) + r,
          r,
          color: ['#6cf', '#fc6', '#c6f', '#6f6', '#f66', '#ff6', '#66f'][i % 7],
          dx: (Math.random() - 0.5) * 0.6,
          dy: (Math.random() - 0.5) * 0.6
        };
      });
    }

    function resizeCanvasAndObjects() {
      const rect = heroSection.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      createStarsAndPlanets();
    }
    resizeCanvasAndObjects();
    window.addEventListener('resize', resizeCanvasAndObjects);
    window.addEventListener('orientationchange', resizeCanvasAndObjects);

    function drawStars() {
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = '#fff';
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.restore();
    }

    function updateStars() {
      for (const star of stars) {
        star.y += star.speedY;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }
    }

    function drawPlanets() {
      for (const planet of planets) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.r, 0, 2 * Math.PI);
        ctx.fillStyle = planet.color;
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
      }
    }

    function updatePlanets() {
      for (const planet of planets) {
        planet.x += planet.dx;
        planet.y += planet.dy;
        // Bounce off edges and keep inside
        if (planet.x < planet.r) {
          planet.x = planet.r;
          planet.dx *= -1;
        }
        if (planet.x > canvas.width - planet.r) {
          planet.x = canvas.width - planet.r;
          planet.dx *= -1;
        }
        if (planet.y < planet.r) {
          planet.y = planet.r;
          planet.dy *= -1;
        }
        if (planet.y > canvas.height - planet.r) {
          planet.y = canvas.height - planet.r;
          planet.dy *= -1;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStars();
      drawPlanets();
      // updateStars(); // Stars are now stationary
      updatePlanets();
      requestAnimationFrame(animate);
    }
    animate();
  }
});
