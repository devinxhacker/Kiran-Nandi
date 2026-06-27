function openNav() {
  const nav = document.getElementById("navo");
  if (nav) {
    nav.style.height = "100%";
  }
}

function closeNav() {
  const nav = document.getElementById("navo");
  if (nav) {
    nav.style.height = "0%";
  }
}

function active() {
  closeNav();
}

function activly() {
  closeNav();
}

function updateHeaderState() {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("uparr");

  if (!header) {
    return;
  }

  const scrolled = window.scrollY > 24;
  header.classList.toggle("header--scrolled", scrolled);

  if (backToTop) {
    backToTop.classList.toggle("show-top", scrolled);
  }
}

function updateHeaderState() {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("uparr");

  if (!header) {
    return;
  }

  const scrolled = window.scrollY > 24;
  header.classList.toggle("header--scrolled", scrolled);

  if (backToTop) {
    backToTop.classList.toggle("show-top", scrolled);
  }
}

function updateCursorGlow(event) {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
  glow.classList.add("active");
}

let liquidFrameId = null;

function hideLoader({ immediate = false } = {}) {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  if (loader.dataset.dismissed === "true") return;
  loader.dataset.dismissed = "true";

  loader.classList.add("hidden");
  
  setTimeout(() => {
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  }, 600);
}


window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Show for at least 5s after full load.
  const keepVisibleForMs = prefersReducedMotion ? 0 : 5000;
  setTimeout(() => hideLoader(), keepVisibleForMs);
});

// Safety: never keep it forever (max 8s from initial execution).
setTimeout(() => hideLoader({ immediate: true }), 8000);

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-content a, .overlay-content a");
  const homeLink = document.querySelector('.nav-content a[href="#home"]');
  const overlay = document.getElementById("navo");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      closeNav();
    });
  });

  if (homeLink) {
    homeLink.classList.add("active");
  }

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeNav();
      }
    });
  }

  if (header) {
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    updateHeaderState();
  }

  if (!prefersReducedMotion) {
    window.addEventListener("pointermove", (event) => {
      updateCursorGlow(event);
    }, { passive: true });
    window.addEventListener("pointerleave", () => {
      const glow = document.getElementById("cursor-glow");
      if (glow) glow.classList.remove("active");
    });
  }
});

document.addEventListener("keydown", (event) => {
  const key = (event.key || "").toLowerCase();

  if (
    event.keyCode === 123 ||
    (event.ctrlKey && key === "u") ||
    (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key))
  ) {
    event.preventDefault();
    return false;
  }

  return true;
});

function showSection(sectionId) {
  // 1. Hide all page sections
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(section => {
    section.classList.remove('active-section');
    section.style.display = 'none';
  });

  // 2. Show the selected section
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = 'block';
    // Use a small timeout to ensure display:block is applied before adding the animation class
    setTimeout(() => {
      activeSection.classList.add('active-section');
    }, 10);
  }

  // 3. Update active navigation links
  const navLinks = document.querySelectorAll('.nav-content a, .overlay-content a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${sectionId}'`)) {
      link.classList.add('active');
    }
  });

  // 4. Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 5. Close mobile menu
  closeNav();

  // 6. Update history hash
  history.replaceState(null, null, `#${sectionId}`);
}

// Handle page load with hash
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  } else {
    showSection('home');
  }
});
