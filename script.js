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

document.addEventListener("DOMContentLoaded", () => {
  // Fetch the automated weekly local database
  fetch('reviews.json')
    .then(response => response.json())
    .then(data => {
      // 1. Dynamically set counter thresholds from the JSON
      const reviewCounter = document.querySelector('[data-target="765"]');
      if (reviewCounter) {
        reviewCounter.setAttribute('data-target', data.stats.totalReviews);
      }

      // 2. Clear out hardcoded marquee text and build it cleanly from latest metrics
      const marqueeTrack = document.querySelector('.animate-marquee');
      if (marqueeTrack && data.reviews.length) {
        marqueeTrack.innerHTML = ''; // wipe native items

        // Build fresh floating blocks
        data.reviews.forEach(item => {
          const card = document.createElement('div');
          card.className = "w-[350px] shrink-0 p-6 rounded-2xl glass-panel border border-gray-700/60 flex flex-col gap-4";
          card.innerHTML = `
                        <div class="flex items-center gap-2 text-yellow-500 text-sm">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                        <p class="text-gray-300 flex-grow italic text-[15px]">"${item.text}"</p>
                        <div class="flex items-center gap-3 mt-2">
                            <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30">${item.name.charAt(0)}</div>
                            <div class="text-sm"><p class="text-white font-bold tracking-wide">${item.name}</p></div>
                        </div>
                    `;
          marqueeTrack.appendChild(card);
        });

        // Duplicate items to preserve seamless infinite-loop animation length
        const cloneSet = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML += cloneSet;
      }

      // Trigger standard counter graphics sequence now that values are mapped
      initCounters();
    })
    .catch(err => {
      console.log("Loading default fallback metrics during asset preparation", err);
      initCounters(); // Run fallback gracefully if json isn't generated yet
    });
});

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


// document.addEventListener("DOMContentLoaded", () => {
//   // Use a flag or check to ensure initCounters doesn't run globally before the data arrives
//   fetch('reviews.json')
//     .then(response => {
//       if (!response.ok) throw new Error('Network response was not ok');
//       return response.json();
//     })
//     .then(data => {
//       const rawTotal = data.total_reviews || 0;
//       const rawRating = data.rating || 0.0;

//       // 1. Target the Total Reviews counter
//       const totalCounter = document.querySelector('[data-id="total-reviews-counter"]');
//       if (totalCounter && rawTotal > 0) {
//         const roundedTotal = Math.floor(rawTotal / 10) * 10;
//         totalCounter.setAttribute('data-target', roundedTotal);
//         totalCounter.textContent = "0";
//       }

//       // 2. Target the 5-Star Ratings counter
//       const starCounter = document.querySelector('[data-id="five-star-counter"]');
//       if (starCounter && rawTotal > 0) {
//         let fiveStarPercentage = (rawRating - 3.0) / (5.0 - 3.0);
//         fiveStarPercentage = Math.max(0.1, Math.min(0.98, fiveStarPercentage));

//         const estimatedFiveStars = Math.round(rawTotal * fiveStarPercentage);
//         const roundedStars = Math.floor(estimatedFiveStars / 10) * 10;

//         starCounter.setAttribute('data-target', roundedStars);
//         starCounter.textContent = "0";
//       }

//       // 3. FIX: Target by data-id attribute so the selector remains structurally permanent
//       const averageCounter = document.querySelector('[data-id="average-rating-counter"]');
//       if (averageCounter && rawRating > 0) {
//         const liveRating = parseFloat(rawRating).toFixed(1);
//         averageCounter.setAttribute('data-target', liveRating);
//         averageCounter.textContent = "0.0";
//       }

//       // Safe trigger execution now that DOM tokens are mutated
//       if (typeof initCounters === 'function') {
//         initCounters();
//       }
//     })
//     .catch(err => {
//       console.error("Graceful fallback execution triggered:", err);
//       if (typeof initCounters === 'function') {
//         initCounters();
//       }
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
  fetch('reviews.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const rawTotal = parseInt(data.total_reviews, 10) || 0;
      const rawRating = parseFloat(data.rating) || 0.0;

      // 1. Target Total Reviews counter -> Round down to nearest 10
      const totalCounter = document.querySelector('[data-id="total-reviews-counter"]');
      if (totalCounter && rawTotal > 0) {
        const roundedTotal = Math.floor(rawTotal / 10) * 10;
        totalCounter.setAttribute('data-target', roundedTotal);
        totalCounter.textContent = "0";
      }

      // 2. Target 5-Star Ratings counter -> Round down to nearest 10
      const starCounter = document.querySelector('[data-id="five-star-counter"]');
      if (starCounter && rawTotal > 0) {
        // Calculate estimated 5-star count based on rating ratio
        let fiveStarPercentage = (rawRating - 3.0) / (5.0 - 3.0);
        fiveStarPercentage = Math.max(0.1, Math.min(1.0, fiveStarPercentage));

        const estimatedFiveStars = Math.round(rawTotal * fiveStarPercentage);
        const roundedStars = Math.floor(estimatedFiveStars / 10) * 10;

        starCounter.setAttribute('data-target', roundedStars);
        starCounter.textContent = "0";
      }

      // 3. Target Average Rating counter (Keep exact 1 decimal place, e.g. 5.0)
      const averageCounter = document.querySelector('[data-id="average-rating-counter"]');
      if (averageCounter && rawRating > 0) {
        const liveRating = rawRating.toFixed(1);
        averageCounter.setAttribute('data-target', liveRating);
        averageCounter.textContent = "0.0";
      }
    })
    .catch(err => {
      console.error("Reviews JSON failed to load, falling back to static DOM values:", err);
    })
    .finally(() => {
      // Always initialize counters AFTER the DOM targets have been updated (or after failure)
      if (typeof initCounters === 'function') {
        initCounters();
      }
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//   // 1. Target your exact grid layouts using the data-ids we added
//   const totalReviewsEl = document.querySelector('[data-id="total-reviews-counter"]');
//   const fiveStarEl = document.querySelector('[data-id="five-star-counter"]');
//   const averageScoreEl = document.querySelector('[data-target="5.0"]');
//   const reviewsContainer = document.getElementById('live-reviews-container');

//   // 2. Safely query your newly compiled JSON block
//   fetch('./reviews.json')
//     .then(response => {
//       if (!response.ok) throw new Error('Failed to parse local review matrix');
//       return response.json();
//     })
//     .then(data => {
//       // A. Update counter targets dynamically from live files
//       if (totalReviewsEl) {
//         totalReviewsEl.setAttribute('data-target', data.total_reviews);
//         totalReviewsEl.innerText = data.total_reviews;
//       }

//       // Estimate 5-star cards dynamically (e.g., matching total reviews or an explicit subset)
//       if (fiveStarEl) {
//         fiveStarEl.setAttribute('data-target', data.total_reviews);
//         fiveStarEl.innerText = data.total_reviews;
//       }

//       if (averageScoreEl) {
//         const liveRating = parseFloat(data.rating).toFixed(1);
//         averageScoreEl.setAttribute('data-target', liveRating);
//         averageScoreEl.innerText = liveRating;

//         // Dynamically correct the denominator text if rating is no longer a flat 5.0
//         const sibling = averageScoreEl.nextElementSibling;
//         if (sibling) sibling.innerText = "/5";
//       }

//       // B. Render individual 5-star customer testimonials
//       if (reviewsContainer && data.reviews && data.reviews.length > 0) {
//         reviewsContainer.innerHTML = ''; // Wipe out existing manual static text

//         // Filter down explicitly to perfect 5-star items from the pipeline array
//         const highRatings = data.reviews.filter(item => item.rating === 5);

//         highRatings.forEach(item => {
//           const card = document.createElement('div');
//           card.className = "min-w-[300px] md:min-w-[380px] p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-md flex flex-col justify-between scroll-snap-align-start transition-all duration-300 hover:border-brand-500/20";

//           // Generate Star Icons block string
//           let starsHTML = '';
//           for (let i = 0; i < item.rating; i++) {
//             starsHTML += '<i class="fas fa-star text-yellow-500 text-sm"></i>';
//           }

//           card.innerHTML = `
//                         <div>
//                             <div class="flex items-center gap-1 mb-3">
//                                 ${starsHTML}
//                             </div>
//                             <p class="text-gray-300 text-sm leading-relaxed mb-6 italic">
//                                 "${item.snippet.length > 180 ? item.snippet.substring(0, 180) + '...' : item.snippet}"
//                             </p>
//                         </div>
//                         <div class="flex items-center gap-3 border-t border-gray-800/60 pt-4">
//                             <img src="${item.user.thumbnail}" alt="${item.user.name}" class="w-10 h-10 rounded-full border border-gray-700 bg-gray-800 object-cover" onError="this.src='https://lh3.googleusercontent.com/a/default-user=s120'"/>
//                             <div>
//                                 <h4 class="text-white text-sm font-semibold">${item.user.name}</h4>
//                                 <p class="text-xs text-gray-500 flex items-center gap-1">
//                                     <span>${item.date}</span> • <span>${item.user.local_guide ? 'Local Guide' : 'Google Reviewer'}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     `;
//           reviewsContainer.appendChild(card);
//         });
//       }
//     })
//     .catch(error => console.error('⚠️ Layout initialization bypassed:', error));
// });
document.addEventListener('DOMContentLoaded', () => {
  const totalReviewsEl = document.querySelector('[data-id="total-reviews-counter"]');
  const fiveStarEl = document.querySelector('[data-id="five-star-counter"]');
  const averageScoreEl = document.querySelector('[data-target="5.0"]');
  const marqueeTrack = document.getElementById('live-reviews-marquee-track');

  fetch('./reviews.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to parse local review matrix');
      return response.json();
    })
    .then(data => {
      // A. Update Top Stats Counters
      if (totalReviewsEl) {
        totalReviewsEl.setAttribute('data-target', data.total_reviews);
        totalReviewsEl.innerText = data.total_reviews;
      }
      if (fiveStarEl) {
        fiveStarEl.setAttribute('data-target', data.total_reviews);
        fiveStarEl.innerText = data.total_reviews;
      }
      if (averageScoreEl) {
        const liveRating = parseFloat(data.rating).toFixed(1);
        averageScoreEl.setAttribute('data-target', liveRating);
        averageScoreEl.innerText = liveRating;
      }

      // B. Build Infinite Marquee Cards
      if (marqueeTrack && data.reviews && data.reviews.length > 0) {
        marqueeTrack.innerHTML = ''; // Clear loader

        // Filter down to perfect 5-star reviews
        const highRatings = data.reviews.filter(item => item.rating === 5);

        // If there are too few reviews, we can use all of them to make sure the track fills space
        const displayList = highRatings.length > 0 ? highRatings : data.reviews;

        // Helper function to build a single card HTML string
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
            <!-- FIX: Added 'whitespace-normal' and 'block' here so the text wraps beautifully within the card boundary -->
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

        // Create the Original Array Segment
        let originalSetHTML = '';
        displayList.forEach(item => {
          originalSetHTML += createCardHTML(item);
        });

        // Inject BOTH sets to preserve seamless looping layout matching your animation rules
        marqueeTrack.innerHTML = originalSetHTML + originalSetHTML;
      }
    })
    .catch(error => console.error('⚠️ Layout dynamic marquee initialization bypassed:', error));
});

// Fetch the dynamic JSON database generated by your Node backend script
fetch('./reviews.json')
  .then(response => response.json())
  .then(data => {
    // 1. Select the dynamic counter elements
    const totalReviewsEl = document.querySelector('[data-id="total-reviews-counter"]');
    const fiveStarEl = document.querySelector('[data-id="five-star-counter"]');
    const averageRatingEl = document.querySelector('[data-id="average-rating-counter"]');

    if (data) {
      // 2. Safely extract values from the JSON data payload
      const actualTotal = data.total_reviews || 768;
      const actualRating = data.rating || 5.0;

      // Estimate 5-star reviews dynamically (~97% of your base given the 5.0 score profile)
      const estimatedFiveStars = Math.floor(actualTotal * 0.97);

      // 3. Update the data-target attributes dynamically
      if (totalReviewsEl) {
        totalReviewsEl.setAttribute('data-target', actualTotal);
        totalReviewsEl.innerText = actualTotal.toLocaleString();
      }
      if (fiveStarEl) {
        fiveStarEl.setAttribute('data-target', estimatedFiveStars);
        fiveStarEl.innerText = estimatedFiveStars.toLocaleString();
      }
      if (averageRatingEl) {
        averageRatingEl.setAttribute('data-target', Number(actualRating).toFixed(1));
        averageRatingEl.innerText = Number(actualRating).toFixed(1);
      }
    }

    // 4. TRIGGER COUNTER INITIALIZATION HERE
    // Make sure your initialization loop (e.g., initCounters() or new CountUp()) 
    // fires AFTER this block so it picks up the fresh data-target parameters!
    if (typeof initializeCounterAnimations === 'function') {
      initializeCounterAnimations();
    }
  })
  .catch(err => console.error("Error connecting metrics pipeline:", err));