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
});