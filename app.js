// Standalone JavaScript - No Dependencies
// All functionality in one file

// Theme Toggle
function initThemeToggle() {
  const toggleButton = document.getElementById('theme-toggle');
  if (!toggleButton) return;
  
  const htmlElement = document.documentElement;

  // Check LocalStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  toggleButton.innerHTML = savedTheme === 'dark'
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  toggleButton.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update Icon
    toggleButton.innerHTML = newTheme === 'dark'
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  });
}

// Animations on Scroll
function initAnimations() {
  const revealElements = document.querySelectorAll('[data-aos="fade-up"], [data-aos="fade-left"], [data-aos="fade-right"]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        const aosType = entry.target.getAttribute('data-aos');
        if (aosType === 'fade-up') {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
        } else if (aosType === 'fade-left') {
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '1';
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach((el) => {
    el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.opacity = '0';

    const aosType = el.getAttribute('data-aos');
    if (aosType === 'fade-up') el.style.transform = 'translateY(30px)';
    if (aosType === 'fade-left') el.style.transform = 'translateX(30px)';

    const delay = el.getAttribute('data-aos-delay');
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }

    revealObserver.observe(el);
  });
}

// Parallax for Spheres
function parallaxEffect(e) {
  document.querySelectorAll(".floating-sphere").forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-speed")) || 0.05;
    const x = (window.innerWidth - e.pageX * speed) / 10;
    const y = (window.innerHeight - e.pageY * speed) / 10;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const nav = document.querySelector('.navbar-glass');
  if (!nav) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
      nav.style.background = 'rgba(15, 23, 42, 0.95)';
      nav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
    } else {
      nav.classList.remove('scrolled');
      nav.style.background = '';
      nav.style.boxShadow = '';
    }
  });
}

// Custom Testimonials Slider (Replaces Swiper)
function initTestimonials() {
  const swiper = document.querySelector('.mySwiper');
  if (!swiper) return;
  
  const slides = swiper.querySelectorAll('.swiper-slide');
  const pagination = swiper.querySelector('.swiper-pagination');
  if (slides.length === 0) return;

  let currentSlide = 0;
  let autoplayInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    
    if (pagination) {
      const dots = pagination.querySelectorAll('.swiper-pagination-bullet');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function createPagination() {
    if (!pagination) return;
    pagination.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'swiper-pagination-bullet';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
        resetAutoplay();
      });
      pagination.appendChild(dot);
    });
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  // Initialize
  createPagination();
  showSlide(0);
  resetAutoplay();

  // Responsive slides per view
  function updateSlidesPerView() {
    const width = window.innerWidth;
    let slidesPerView = 1;
    
    if (width >= 1024) {
      slidesPerView = 3;
    } else if (width >= 768) {
      slidesPerView = 2;
    }

    slides.forEach((slide, i) => {
      if (i < slidesPerView) {
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });
  }

  updateSlidesPerView();
  window.addEventListener('resize', updateSlidesPerView);
}

// Pricing Toggle
function initPricingToggle() {
  const toggles = document.querySelectorAll('.pricing-toggle');
  const priceDisplay = document.querySelector('.price-amount');
  const frequencyDisplay = document.querySelector('.frequency');

  if (toggles.length === 0) return;

  toggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      toggles.forEach(t => {
        t.classList.remove('btn-primary', 'text-white');
        t.classList.add('btn-transparent', 'text-muted');
      });
      e.target.classList.remove('btn-transparent', 'text-muted');
      e.target.classList.add('btn-primary', 'text-white');

      const period = e.target.getAttribute('data-period');
      if (priceDisplay && frequencyDisplay) {
        if (period === 'monthly') {
          priceDisplay.textContent = `$${priceDisplay.getAttribute('data-monthly')}`;
          frequencyDisplay.textContent = '/mo';
        } else {
          priceDisplay.textContent = `$${priceDisplay.getAttribute('data-yearly')}`;
          frequencyDisplay.textContent = '/yr';
        }
      }
    });
  });
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-count');
        const speed = 2000;

        const updateCount = () => {
          const count = +counter.innerText;
          const inc = target / (speed / 16);

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Magnetic Button Effect
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / 4;
      const deltaY = (y - centerY) / 4;

      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// Scroll Progress
function initScrollProgress() {
  const progressBar = document.createElement('div');
  Object.assign(progressBar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '4px',
    background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #10b981)',
    backgroundSize: '200% 100%',
    zIndex: '10000',
    width: '0%',
    transition: 'width 0.1s ease-out',
    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
  });
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

// Particle System
function initParticles() {
  const container = document.createElement('div');
  container.className = 'particles-container';
  document.body.appendChild(container);

  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    container.appendChild(particle);
  }
}

// Custom Cursor Effect
function initCursorEffect() {
  // Don't run on touch devices
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid rgba(139, 92, 246, 0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  cursorFollower.style.cssText = `
    width: 8px;
    height: 8px;
    background: rgba(139, 92, 246, 0.8);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.2s ease;
  `;
  document.body.appendChild(cursorFollower);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top = `${e.clientY - 10}px`;
    cursorFollower.style.left = `${e.clientX - 4}px`;
    cursorFollower.style.top = `${e.clientY - 4}px`;
  });

  document.querySelectorAll('a, button, .feature-card, .glass-panel').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.borderColor = 'rgba(139, 92, 246, 1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = 'rgba(139, 92, 246, 0.5)';
    });
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Card Tilt Effect
function initCardTilt() {
  const cards = document.querySelectorAll('.feature-card, .glass-panel');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Typewriter Effect
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  const words = ['Scalable', 'Fast', 'Modern', 'Powerful', 'Intelligent'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// Spotlight Effect
function initSpotlight() {
  const spotlight = document.createElement('div');
  spotlight.className = 'mouse-spotlight';
  document.body.appendChild(spotlight);

  document.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
    spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  document.querySelectorAll('.glow-card, .feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggle = document.querySelector('.navbar-toggler');
  const menu = document.querySelector('#navbarNav');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initAnimations();
  initNavbarScroll();
  initPricingToggle();
  initTestimonials();
  initCounters();
  initMagneticButtons();
  initSpotlight();
  initTypewriter();
  initScrollProgress();
  initParticles();
  initCursorEffect();
  initSmoothScroll();
  initCardTilt();
  initMobileMenu();

  // Parallax effect
  document.addEventListener("mousemove", parallaxEffect);
});
