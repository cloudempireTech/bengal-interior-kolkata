// ========================================================
// BENGAL INTERIOR - Interactive Engine & Dynamic Micro-Interactions
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const toggleBtn = document.getElementById('navToggleBtn');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Dynamic Typewriter Animation
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const phrases = [
      'Bespoke Living Spaces',
      'Modular Kitchens & Wardrobes',
      'Luxury Home Renovations',
      'Architectural False Ceilings',
      'Turnkey Commercial Offices'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIdx];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 50;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typingSpeed = 2200; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400; // pause before typing next
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // 3. Hero Video Pause / Play Accessible Toggle
  const heroVideo = document.getElementById('heroVideo');
  const videoControlBtn = document.getElementById('videoControlBtn');
  if (heroVideo && videoControlBtn) {
    videoControlBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoControlBtn.innerHTML = `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
        videoControlBtn.setAttribute('aria-label', 'Pause video');
      } else {
        heroVideo.pause();
        videoControlBtn.innerHTML = `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
        videoControlBtn.setAttribute('aria-label', 'Play video');
      }
    });
  }

  // 4. Animated Count-Up Telemetry Numbers
  const statNumbers = document.querySelectorAll('.stat-counter');
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1800;
          const startTime = performance.now();

          function updateCount(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const current = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(updateCount);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  // 5. Sticky Portfolio Filter Rail
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Dynamic Turnkey Project Estimator Widget
  const sqftSlider = document.getElementById('sqftSlider');
  const sqftDisplay = document.getElementById('sqftDisplay');
  const timelineMetric = document.getElementById('timelineMetric');
  const designRoundsMetric = document.getElementById('designRoundsMetric');
  const warrantyMetric = document.getElementById('warrantyMetric');
  const propertySelect = document.getElementById('propertyType');

  function updateEstimator() {
    if (!sqftSlider) return;
    const sqft = parseInt(sqftSlider.value, 10);
    if (sqftDisplay) sqftDisplay.textContent = `${sqft.toLocaleString()} sq.ft`;

    // Dynamic Turnkey Estimates (Pure calculation, zero pricing)
    let timelineDays = 35;
    let designRounds = '3-5 Renders';
    let warranty = '10 Years';

    if (sqft < 900) {
      timelineDays = 30;
      designRounds = '4 Photorealistic 3D Views';
      warranty = '10-Year Hardware';
    } else if (sqft <= 1500) {
      timelineDays = 42;
      designRounds = '6 Full 3D Walkthrough Renders';
      warranty = '10-Year Hardware';
    } else if (sqft <= 2400) {
      timelineDays = 55;
      designRounds = '10 Immersive 3D VR Renders';
      warranty = '10-Year Comprehensive';
    } else {
      timelineDays = 70;
      designRounds = 'Unlimited 3D Architecture Views';
      warranty = '12-Year Comprehensive';
    }

    if (timelineMetric) timelineMetric.textContent = `${timelineDays} Days`;
    if (designRoundsMetric) designRoundsMetric.textContent = designRounds;
    if (warrantyMetric) warrantyMetric.textContent = warranty;
  }

  if (sqftSlider) {
    sqftSlider.addEventListener('input', updateEstimator);
  }
  if (propertySelect) {
    propertySelect.addEventListener('change', updateEstimator);
  }
  updateEstimator();

  // 7. Interactive Inquiry Form to WhatsApp Handoff
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName') ? document.getElementById('formName').value.trim() : '';
      const service = document.getElementById('formService') ? document.getElementById('formService').value : 'General Inquiry';
      const locality = document.getElementById('formLocality') ? document.getElementById('formLocality').value.trim() : 'Kolkata';
      const message = document.getElementById('formMessage') ? document.getElementById('formMessage').value.trim() : '';

      const waMsg = `Namaste Bengal Interior!\n\nI would like to inquire about your interior design services for my space:\n- Name: ${name || 'Prospective Client'}\n- Service Needed: ${service}\n- Locality/Address: ${locality}\n- Details: ${message || 'Looking for an initial design consultation and site visit.'}\n\nPlease let me know your available slots. Thank you!`;

      const waUrl = `https://wa.me/919903305943?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');
    });
  }
});
