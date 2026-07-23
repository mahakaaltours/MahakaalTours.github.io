// Mobile navigation toggle
function toggleMobileNav() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('nav-icon');

  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    menu.classList.add('hidden');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-lg', 'bg-gray-900/90');
    navbar.classList.remove('bg-gray-900/40');
  } else {
    navbar.classList.remove('shadow-lg', 'bg-gray-900/90');
    navbar.classList.add('bg-gray-900/40');
  }

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('main, section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    // 200px offset to activate link slightly before it hits the top (accounting for fixed navbar)
    if (window.scrollY >= (sectionTop - 200)) {
      currentSection = section.getAttribute('id') || '';
    }
  });

  // If scrolled to the bottom of the page, forcefully activate the last section (Contact)
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

  // Mobile links (excluding the specifically styled Contact button)
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
  // Set dynamic copyright year
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Set correct initial active link nav
  window.dispatchEvent(new Event('scroll'));
});

// --- Scroll Activation logic for the Widget panel overlay ---
const analyticsPanel = document.getElementById('analytics-panel');
const triggerSection = document.getElementById('counter-trigger-section');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Fade and slide it into view when scrolling down past reviews
      analyticsPanel.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
      analyticsPanel.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else {
      // Hide it again cleanly when scrolling back above the reviews section
      analyticsPanel.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
      analyticsPanel.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
  });
}, { threshold: 0.1 });

if (triggerSection) {
  scrollObserver.observe(triggerSection);
}

// Global toggle logic for analytics box accordion frame
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
  // --- Counter Animation logic using IntersectionObserver ---
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

  // --- Scroll Activation logic for the Widget panel overlay ---
  const analyticsPanel = document.getElementById('analytics-panel');
  const triggerSection = document.getElementById('counter-trigger-section');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade and slide it into physical interactive view state layout
        analyticsPanel.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        analyticsPanel.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      }
    });
  }, { threshold: 0.1 });

  if (triggerSection) {
    scrollObserver.observe(triggerSection);
  }

  // --- Analytics Realtime Activity Simulator logic ---
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
      // -------------------------------------------------------------
      // PART A: Update Top Stats Counter Targets
      // -------------------------------------------------------------
      const rawTotal = parseInt(data.total_reviews, 10) || 0;
      const rawRating = parseFloat(data.rating) || 0.0;

      // 1. Total Reviews -> Floor to nearest 10 (e.g., 769 -> 760)
      if (totalCounter && rawTotal > 0) {
        const roundedTotal = Math.floor(rawTotal / 10) * 10;
        totalCounter.setAttribute('data-target', roundedTotal);
      }

      // 2. 5-Star Ratings -> Floor to nearest 10
      if (starCounter && rawTotal > 0) {
        let fiveStarPercentage = (rawRating - 3.0) / (5.0 - 3.0);
        fiveStarPercentage = Math.max(0.1, Math.min(1.0, fiveStarPercentage));
        const estimatedFiveStars = Math.round(rawTotal * fiveStarPercentage);
        const roundedStars = Math.floor(estimatedFiveStars / 10) * 10;

        starCounter.setAttribute('data-target', roundedStars);
      }

      // 3. Average Rating
      if (averageCounter && rawRating > 0) {
        averageCounter.setAttribute('data-target', rawRating.toFixed(1));
      }

      // -------------------------------------------------------------
      // PART B: Build Infinite Marquee Cards
      // -------------------------------------------------------------
      if (marqueeTrack && data.reviews && data.reviews.length > 0) {
        marqueeTrack.innerHTML = ''; // Clear loader

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
            <div class="w-[350px] shrink-0 p-6 rounded-2xl glass-panel border border-gray-700/60 flex flex-col gap-4 transition-all hover:scale-[1.02] hover:border-gray-500/60 whitespace-normal">
                <div class="flex items-center gap-2 text-yellow-500 text-sm">
                    ${starsHTML}
                </div>
                <p class="text-gray-300 flex-grow italic text-[15px] leading-relaxed block whitespace-normal break-words">
                    "${truncatedSnippet}"
                </p>
                <div class="flex items-center gap-3 mt-2">
                    ${item.user.thumbnail ?
              `<img src="${item.user.thumbnail}" alt="${item.user.name}" class="w-10 h-10 rounded-full border border-gray-700/60 object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30\\'>${initial}</div>'"/>`
              : `<div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30">${initial}</div>`
            }
                    <div class="text-sm">
                        <p class="text-white font-bold tracking-wide">${item.user.name}</p>
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
      // Crucial: Fire counter animation ONLY after data-target attributes are guaranteed to be set
      if (typeof initCounters === 'function') {
        initCounters();
      }
    });
});