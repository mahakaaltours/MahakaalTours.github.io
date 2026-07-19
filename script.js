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