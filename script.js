// Mobile navigation toggle
// function toggleMobileNav() {
//   const menu = document.getElementById('mobile-menu');
//   const icon = document.getElementById('nav-icon');

//   if (menu.classList.contains('hidden')) {
//     menu.classList.remove('hidden');
//     icon.classList.remove('fa-bars');
//     icon.classList.add('fa-times');
//   } else {
//     menu.classList.add('hidden');
//     icon.classList.remove('fa-times');
//     icon.classList.add('fa-bars');
//   }
// }

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const isLight = document.documentElement.classList.contains('light-theme');

  if (window.scrollY > 50) {
    navbar.classList.add('shadow-lg');
    navbar.style.backgroundColor = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.90)';
  } else {
    navbar.classList.remove('shadow-lg');
    navbar.style.backgroundColor = isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(17, 24, 39, 0.40)';
  }

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('main, section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 200)) {
      currentSection = section.getAttribute('id') || '';
    }
  });

  if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
    currentSection = 'contact';
  }

  const activeHref = currentSection ? `#${currentSection}` : '#';

  // Desktop links
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    if (href === activeHref) {
      link.classList.add('text-brand-400', 'font-semibold', 'hover:text-brand-300');
      link.classList.remove('text-gray-300', 'hover:text-white');
    } else {
      link.classList.add('text-gray-300', 'hover:text-white');
      link.classList.remove('text-brand-400', 'font-semibold', 'hover:text-brand-300');
    }
  });

  // Mobile links
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#') || href === '#contact') return;

    if (href === activeHref) {
      link.classList.add('text-brand-400');
      link.classList.remove('text-gray-300', 'hover:text-white');
    } else {
      link.classList.add('text-gray-300', 'hover:text-white');
      link.classList.remove('text-brand-400');
    }
  });
});

// Trigger dynamic updates on load
window.addEventListener('load', () => {
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  window.dispatchEvent(new Event('scroll'));
});

// --- Theme Toggle Logic ---
function initThemeToggle() {
  const desktopBtn = document.getElementById('theme-toggle');
  const mobileBtn = document.getElementById('theme-toggle-mobile');
  const desktopIcon = document.getElementById('theme-toggle-icon');
  const mobileIcon = document.getElementById('theme-toggle-icon-mobile');

  function updateIcons(isLight) {
    [desktopIcon, mobileIcon].forEach(icon => {
      if (!icon) return;
      // Determine size depending on whether it's mobile or desktop (or keep uniform text-sm)
      const sizeClass = icon.id === 'theme-toggle-icon-mobile' ? 'text-sm' : 'text-base';

      if (isLight) {
        icon.className = `fas fa-moon ${sizeClass} text-indigo-400`;
      } else {
        icon.className = `fas fa-sun ${sizeClass} text-yellow-400`;
      }
    });
  }

  // Set initial icon state on load
  const isLightInitial = document.documentElement.classList.contains('light-theme');
  updateIcons(isLightInitial);

  function handleThemeSwitch() {
    const isLightNow = document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
    updateIcons(isLightNow);
    window.dispatchEvent(new Event('scroll'));
  }

  if (desktopBtn) desktopBtn.addEventListener('click', handleThemeSwitch);
  if (mobileBtn) mobileBtn.addEventListener('click', handleThemeSwitch);
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
});

// --- Scroll Activation logic for the Widget panel overlay ---
const analyticsPanel = document.getElementById('analytics-panel');
const triggerSection = document.getElementById('counter-trigger-section');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      analyticsPanel.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
      analyticsPanel.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else {
      analyticsPanel.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
      analyticsPanel.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
  });
}, { threshold: 0.1 });

if (triggerSection) {
  scrollObserver.observe(triggerSection);
}

function toggleAnalyticsBody() {
  const body = document.getElementById('analytics-body');
  const arrow = document.getElementById('analytics-arrow');
  if (body.style.maxHeight === '0px' || !body.style.maxHeight) {
    body.style.maxHeight = '200px';
    body.style.opacity = '1';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    body.style.maxHeight = '0px';
    body.style.opacity = '0';
    arrow.style.transform = 'rotate(0deg)';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Counter Animation logic
  const counters = document.querySelectorAll('.counter');
  const speed = 60;

  const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals')) : 0;
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count.toFixed(decimals);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toFixed(decimals);
      }
    };
    updateCount();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Analytics Realtime Activity Simulator logic
  const activeEl = document.getElementById('stat-active');
  const viewsEl = document.getElementById('stat-views');

  let currentViews = sessionStorage.getItem('site_views') ? parseInt(sessionStorage.getItem('site_views')) : Math.floor(Math.random() * 50) + 120;
  currentViews++;
  sessionStorage.setItem('site_views', currentViews);
  if (viewsEl) viewsEl.innerText = currentViews;

  setInterval(() => {
    if (activeEl) {
      let currentActive = parseInt(activeEl.innerText);
      let change = Math.random() > 0.5 ? 1 : -1;
      let nextActive = Math.max(2, currentActive + change);
      if (nextActive > 12) nextActive = 5;
      activeEl.innerText = nextActive;
    }

    if (Math.random() > 0.65 && viewsEl) {
      currentViews++;
      sessionStorage.setItem('site_views', currentViews);
      viewsEl.innerText = currentViews;
    }
  }, 3500);
});

// Single Consolidated Reviews & Counter Initialization
document.addEventListener('DOMContentLoaded', () => {
  const totalCounter = document.querySelector('[data-id="total-reviews-counter"]');
  const starCounter = document.querySelector('[data-id="five-star-counter"]');
  const averageCounter = document.querySelector('[data-id="average-rating-counter"]');
  const marqueeTrack = document.getElementById('live-reviews-marquee-track');

  fetch('./reviews.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load reviews data');
      return response.json();
    })
    .then(data => {
      const rawTotal = parseInt(data.total_reviews, 10) || 0;
      const rawRating = parseFloat(data.rating) || 0.0;

      if (totalCounter && rawTotal > 0) {
        const roundedTotal = Math.floor(rawTotal / 10) * 10;
        totalCounter.setAttribute('data-target', roundedTotal);
      }

      if (starCounter && rawTotal > 0) {
        let fiveStarPercentage = (rawRating - 3.0) / (5.0 - 3.0);
        fiveStarPercentage = Math.max(0.1, Math.min(1.0, fiveStarPercentage));
        const estimatedFiveStars = Math.round(rawTotal * fiveStarPercentage);
        const roundedStars = Math.floor(estimatedFiveStars / 10) * 10;

        starCounter.setAttribute('data-target', roundedStars);
      }

      if (averageCounter && rawRating > 0) {
        averageCounter.setAttribute('data-target', rawRating.toFixed(1));
      }

      if (marqueeTrack && data.reviews && data.reviews.length > 0) {
        marqueeTrack.innerHTML = '';

        const highRatings = data.reviews.filter(item => item.rating === 5);
        const displayList = highRatings.length > 0 ? highRatings : data.reviews;

        const createCardHTML = (item) => {
          let starsHTML = '';
          for (let i = 0; i < item.rating; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
          }

          const initial = item.user.name ? item.user.name.charAt(0).toUpperCase() : 'U';
          const maxChars = 160;
          const truncatedSnippet = item.snippet.length > maxChars
            ? item.snippet.substring(0, maxChars) + '...'
            : item.snippet;

          return `
            <div class="w-[350px] shrink-0 p-6 rounded-2xl glass-panel border theme-border flex flex-col gap-4 transition-all hover:scale-[1.02] theme-border-hover whitespace-normal">
                <div class="flex items-center gap-2 text-yellow-500 text-sm">
                    ${starsHTML}
                </div>
                <p class="theme-text-muted flex-grow italic text-[15px] leading-relaxed block whitespace-normal break-words">
                    "${truncatedSnippet}"
                </p>
                <div class="flex items-center gap-3 mt-2">
                    ${item.user.thumbnail ?
              `<img src="${item.user.thumbnail}" alt="${item.user.name}" class="w-10 h-10 rounded-full border theme-border object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30\\'>${initial}</div>'"/>`
              : `<div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30">${initial}</div>`
            }
                    <div class="text-sm">
                        <p class="theme-text-heading font-bold tracking-wide">${item.user.name}</p>
                    </div>
                </div>
            </div>
          `;
        };

        let originalSetHTML = '';
        displayList.forEach(item => {
          originalSetHTML += createCardHTML(item);
        });

        marqueeTrack.innerHTML = originalSetHTML + originalSetHTML;
      }
    })
    .catch(error => console.error('⚠️ Reviews system load error:', error))
    .finally(() => {
      if (typeof initCounters === 'function') {
        initCounters();
      }
    });
});

// Weather Widget
(function (d, s, id) {
  if (d.getElementById(id)) {
    if (window.__TOMORROW__) {
      window.__TOMORROW__.renderWidget();
    }
    return;
  }
  const fjs = d.getElementsByTagName(s)[0];
  const js = d.createElement(s);
  js.id = id;
  js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";

  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'tomorrow-sdk');

// Document Title Manager
const defaultBrandTitle = "Mahakaal 🔱 Tours & Bike Rentals";

function updatePageTitle(sectionName) {
  if (!sectionName || sectionName.toLowerCase() === 'home' || sectionName.toLowerCase() === 'hero') {
    document.title = defaultBrandTitle;
  } else {
    document.title = `${sectionName} | ${defaultBrandTitle}`;
  }
}

const sections = document.querySelectorAll('section[id]');
const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id').toLowerCase();

      if (sectionId === 'home' || sectionId === 'hero') {
        updatePageTitle('Home');
      } else {
        const formattedName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
        updatePageTitle(formattedName);
      }
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

window.addEventListener('scroll', () => {
  if (window.scrollY < 100) {
    updatePageTitle('Home');
  }
});

// WhatsApp Button Configuration
document.addEventListener("DOMContentLoaded", function () {
  const phoneNumber = SITE_CONFIG.WHATSAPP_NUMBER;
  const queryMsg = "Hello! I'm interested in your tour packages. Can you please provide me with more information?";
  const shortWaUrl = `https://wa.me/${phoneNumber}`;

  const waBtn = document.getElementById("wa-float-btn");
  if (waBtn) {
    waBtn.href = shortWaUrl;

    waBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const fullWaUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(queryMsg)}`;
      window.open(fullWaUrl, "_blank", "noopener,noreferrer");
    });
  }
});

// Updated Navbar Scroll Handler in script.js
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return; // Guard clause if navbar is missing

  const isLight = document.documentElement.classList.contains('light-theme');

  if (window.scrollY > 50) {
    navbar.classList.add('shadow-lg');
    navbar.style.backgroundColor = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.90)';
  } else {
    navbar.classList.remove('shadow-lg');
    navbar.style.backgroundColor = isLight ? 'rgba(255, 255, 255, 0.88)' : 'rgba(17, 24, 39, 0.75)';
  }

  // Active Nav Link highlight on Scroll (Desktop)
  const sections = document.querySelectorAll('main, section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 200)) {
      currentSection = section.getAttribute('id') || '';
    }
  });

  const activeHref = currentSection ? `#${currentSection}` : '#';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    if (href === activeHref) {
      link.classList.add('font-bold');
      link.style.color = '#059669'; // High contrast green for active tab
    } else {
      link.classList.remove('font-bold');
      link.style.color = ''; // Reverts back to --nav-link-color CSS variable
    }
  });

  // Also trigger mobile active link updater on scroll
  updateActiveNavLink();
});

// --- Active Nav Link Scroll Handler for Mobile/General ---
function updateActiveNavLink() {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const navLinks = document.querySelectorAll('.mobile-nav-link, .nav-link');

  // Get all targetable sections
  const sections = Array.from(document.querySelectorAll('section[id], main[id], header[id], div[id]'));

  let currentSection = '';

  // 1. Force 'home' active if scrolled near the top
  if (scrollPosition < 150) {
    currentSection = 'home';
  } else {
    // 2. Check each section's offset position
    const navbarHeight = 100; // Account for top navbar space

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionId = section.getAttribute('id');
      if (!sectionId) continue;

      const top = section.offsetTop - navbarHeight;
      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        currentSection = sectionId.toLowerCase();
        break; // Stop at the matching active section
      }
    }
  }

  // 3. Apply active class
  navLinks.forEach((link) => {
    if (!link) return;
    link.classList.remove('active');
    const href = link.getAttribute('href');

    if (!href) return;

    const targetId = href.replace('#', '').toLowerCase();

    if (
      (targetId === 'home' || href === '#' || href === '') && currentSection === 'home'
    ) {
      link.classList.add('active');
    } else if (targetId && targetId === currentSection) {
      link.classList.add('active');
    }
  });
}

// Mobile Nav Toggle with Safe Icon Class Switching
function toggleMobileNav() {
  const mobileMenu = document.getElementById('mobile-menu');
  const navIcon = document.getElementById('nav-icon');

  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');

    // Toggle icon safely
    if (navIcon) {
      if (mobileMenu.classList.contains('hidden')) {
        navIcon.className = 'fas fa-bars'; // Restores hamburger icon when menu closes
      } else {
        navIcon.className = 'fas fa-times'; // Changes to 'X' close icon when menu opens
      }
    }

    // Immediately recalculate active item when menu opens
    if (!mobileMenu.classList.contains('hidden')) {
      updateActiveNavLink();
    }
  }
}

// Bind scroll and DOM ready events
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Cycles All Background Images Dynamically
// function startBackgroundSlideshow() {
//   const slides = document.querySelectorAll('.bg-slide');
//   if (slides.length === 0) return;

//   let currentSlide = 0;

//   setInterval(() => {
//     // Hide current slide
//     slides[currentSlide].classList.remove('opacity-70', 'opacity-90');
//     slides[currentSlide].classList.add('opacity-0');

//     // Move to next slide (loops automatically using modulo)
//     currentSlide = (currentSlide + 1) % slides.length;

//     // Show next slide
//     slides[currentSlide].classList.remove('opacity-0');
//     slides[currentSlide].classList.add('opacity-70');
//   }, 5000); // Transitions every 5 seconds
// }

// document.addEventListener('DOMContentLoaded', startBackgroundSlideshow);

function initBackgroundSlideshow() {
  const slideshowContainer = document.querySelector('.bg-slide')?.parentElement;
  const slides = document.querySelectorAll('.bg-slide');

  if (!slides.length || !slideshowContainer) return;

  // --- RANDOM EFFECT SELECTOR PER REFRESH / SESSION ---
  // Option A: Use sessionStorage so it stays uniform while clicking around, but randomized per session
  let selectedEffect = sessionStorage.getItem('slideshowEffect');

  if (!selectedEffect) {
    // 50% chance for Zoom-In, 50% chance for Blur-to-Focus
    selectedEffect = Math.random() < 0.5 ? 'transition-zoom' : 'transition-blur';
    sessionStorage.setItem('slideshowEffect', selectedEffect);
  }

  // Apply the chosen effect class to the container parent
  slideshowContainer.classList.add(selectedEffect);
  console.log(`Slideshow initialized with effect: ${selectedEffect}`);

  if (slides.length < 2) return;

  let currentIndex = 0;

  // Cycle through images every 5 seconds
  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackgroundSlideshow);
} else {
  initBackgroundSlideshow();
}