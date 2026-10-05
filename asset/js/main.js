document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeroSlider();
  initHeaderScroll();
  initVideoModal();
  initMobileMenu();
  initSmoothScroll();
  initTestimonialsSlider();
  initPartnersSlider();
  initProgressSlider();
});

/* ===================================================================
   TESTIMONIALS SLIDER ("What People Say About Us")
   =================================================================== */
function initTestimonialsSlider() {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (!testimonialSlides.length) return;

  let currentSlideIndex = 0;
  const totalTestimonials = testimonialSlides.length;

  function showTestimonial(index) {
    if (index >= totalTestimonials) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = totalTestimonials - 1;
    } else {
      currentSlideIndex = index;
    }

    testimonialSlides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showTestimonial(currentSlideIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showTestimonial(currentSlideIndex - 1);
    });
  }
}

/* ===================================================================
   HERO SLIDER (5 SLIDES)
   =================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const pageNumbers = document.querySelectorAll('.page-num');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const heroSection = document.querySelector('.hero-section');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval = null;
  const slideDuration = 6000; // 6 seconds per slide

  function goToSlide(index) {
    // Wrap around index
    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }

    // Update slides
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update pagination numbers
    pageNumbers.forEach((num, i) => {
      if (i === currentSlide) {
        num.classList.add('active');
      } else {
        num.classList.remove('active');
      }
    });
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, slideDuration);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Next / Prev button event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      startAutoplay();
    });
  }

  // Direct page number click listeners
  pageNumbers.forEach((pageBtn, idx) => {
    pageBtn.addEventListener('click', () => {
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Pause autoplay on mouse hover over hero
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);
  }

  // Keyboard arrow keys navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentSlide - 1);
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentSlide + 1);
      startAutoplay();
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      // Swiped left -> Next
      goToSlide(currentSlide + 1);
      startAutoplay();
    }
    if (touchEndX > touchStartX + threshold) {
      // Swiped right -> Prev
      goToSlide(currentSlide - 1);
      startAutoplay();
    }
  }

  // Initialize first slide and start autoplay
  goToSlide(0);
  startAutoplay();
}

/* ===================================================================
   STICKY HEADER SCROLL EFFECT
   =================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ===================================================================
   VIDEO MODAL POPUP
   =================================================================== */
function initVideoModal() {
  const videoCard = document.getElementById('openVideoModal');
  const videoModal = document.getElementById('videoModal');
  const closeModal = document.getElementById('closeModal');
  const videoFrame = document.getElementById('videoIframe');

  const sampleVideoUrl = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1";

  if (!videoCard || !videoModal) return;

  videoCard.addEventListener('click', () => {
    if (videoFrame) {
      videoFrame.src = sampleVideoUrl;
    }
    videoModal.classList.add('active');
  });

  function hideModal() {
    videoModal.classList.remove('active');
    if (videoFrame) {
      videoFrame.src = '';
    }
  }

  if (closeModal) {
    closeModal.addEventListener('click', hideModal);
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      hideModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      hideModal();
    }
  });
}

/* ===================================================================
   MOBILE MENU TOGGLE & ROYAL BLUE DRAWER
   =================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawerMenu');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const mainNav = document.querySelector('.main-navigation');

  if (!menuBtn) return;

  function openMenu() {
    if (drawer) {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else if (mainNav) {
      mainNav.classList.add('mobile-active');
    }
    menuBtn.classList.add('is-active');
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (mainNav) {
      mainNav.classList.remove('mobile-active');
    }
    menuBtn.classList.remove('is-active');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(e) {
    if (e) e.stopPropagation();
    const isOpen = drawer ? drawer.classList.contains('is-open') : (mainNav && mainNav.classList.contains('mobile-active'));
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Close when clicking any nav link inside drawer or mainNav
  if (drawer) {
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }
  if (mainNav) {
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Close on window resize beyond mobile view (> 992px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      closeMenu();
    }
  });
}

/* ===================================================================
   PARTNERS / CLIENT LOGOS SLIDER
   =================================================================== */
function initPartnersSlider() {
  const slides = document.querySelectorAll('.partners-slide');
  const prevBtn = document.getElementById('prevPartner');
  const nextBtn = document.getElementById('nextPartner');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  function showPartnerSlide(index) {
    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showPartnerSlide(currentSlide + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showPartnerSlide(currentSlide - 1);
    });
  }
}

/* ===================================================================
   SMOOTH SCROLLING FOR INTERNAL LINKS
   =================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ===================================================================
   ABOUT PROGRESS / AWARDS SLIDER (Smooth Multi-Item Sliding Carousel)
   =================================================================== */
function initProgressSlider() {
  const prevBtn = document.getElementById('prevProgress');
  const nextBtn = document.getElementById('nextProgress');
  const trackWrapper = document.querySelector('.progress-track-wrapper');
  const progressTrack = document.getElementById('progressTrack') || document.querySelector('.progress-grid');
  const items = document.querySelectorAll('.progress-item');

  if (!trackWrapper || !prevBtn || !nextBtn || !progressTrack || !items.length) return;

  let currentIndex = 0;
  let visibleCards = 4;
  let gap = 32;
  let itemWidth = 0;
  let maxIndex = 0;

  function calculateDimensions() {
    const wrapperWidth = trackWrapper.clientWidth;
    if (window.innerWidth <= 480) {
      visibleCards = 1;
      gap = 20;
    } else if (window.innerWidth <= 768) {
      visibleCards = 2;
      gap = 24;
    } else if (window.innerWidth <= 1024) {
      visibleCards = 3;
      gap = 28;
    } else {
      visibleCards = 4;
      gap = 32;
    }

    itemWidth = (wrapperWidth - (visibleCards - 1) * gap) / visibleCards;
    items.forEach(item => {
      item.style.width = `${itemWidth}px`;
      item.style.minWidth = `${itemWidth}px`;
    });

    maxIndex = Math.max(0, items.length - visibleCards);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    updateTrackPosition();
  }

  function updateTrackPosition() {
    const offset = currentIndex * (itemWidth + gap);
    progressTrack.style.transform = `translateX(-${offset}px)`;
  }

  function slideNext() {
    if (currentIndex >= maxIndex) {
      currentIndex = 0; // Smooth loop to start
    } else {
      currentIndex++;
    }
    updateTrackPosition();
  }

  function slidePrev() {
    if (currentIndex <= 0) {
      currentIndex = maxIndex; // Smooth loop to end
    } else {
      currentIndex--;
    }
    updateTrackPosition();
  }

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    slideNext();
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    slidePrev();
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  trackWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  trackWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      slideNext();
    } else if (touchEndX > touchStartX + threshold) {
      slidePrev();
    }
  }, { passive: true });

  // Recalculate on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(calculateDimensions, 100);
  });

  // Initial calculation
  calculateDimensions();
}

/* ===================================================================
   HOME PAGE PRELOADER & TELEMETRY PROGRESS SIMULATOR
   =================================================================== */
function initPreloader() {
  const preloader = document.getElementById('sitePreloader');
  const percentEl = document.getElementById('preloaderPercent');
  const barEl = document.getElementById('preloaderBar');
  const statusEl = document.getElementById('preloaderStatusText');

  if (!preloader) return;

  const statuses = [
    'INITIALIZING FLIGHT SYSTEMS...',
    'CALIBRATING SENSORS & LIDAR...',
    'ESTABLISHING SATELLITE TELEMETRY...',
    'SYNCING AUTONOMOUS AVIONICS...',
    'STACKLY FLEET READY'
  ];

  let currentPercent = 0;
  let isWindowLoaded = false;

  window.addEventListener('load', () => {
    isWindowLoaded = true;
  });

  const interval = setInterval(() => {
    // Dynamic smooth progression
    const increment = isWindowLoaded ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 3) + 1;
    currentPercent = Math.min(currentPercent + increment, isWindowLoaded ? 100 : 90);

    if (percentEl) percentEl.textContent = `${currentPercent}%`;
    if (barEl) barEl.style.width = `${currentPercent}%`;

    if (statusEl) {
      if (currentPercent < 25) {
        statusEl.textContent = statuses[0];
      } else if (currentPercent < 50) {
        statusEl.textContent = statuses[1];
      } else if (currentPercent < 75) {
        statusEl.textContent = statuses[2];
      } else if (currentPercent < 95) {
        statusEl.textContent = statuses[3];
      } else {
        statusEl.textContent = statuses[4];
      }
    }

    if (currentPercent >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('is-loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, 400);
    }
  }, 35);

  // Safety fallback timeout
  setTimeout(() => {
    isWindowLoaded = true;
    currentPercent = 100;
    if (percentEl) percentEl.textContent = '100%';
    if (barEl) barEl.style.width = '100%';
    if (statusEl) statusEl.textContent = statuses[4];
    setTimeout(() => {
      preloader.classList.add('is-loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 800);
    }, 350);
  }, 3800);
}

