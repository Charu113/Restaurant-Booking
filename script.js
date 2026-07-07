/* =========================================================
   SMART DINE — script.js
   Vanilla JavaScript only. Covers every page.
   Sections:
     1. Loader
     2. Navbar (sticky shadow + mobile drawer)
     3. Dark mode toggle + persistence
     4. Scroll reveal animations
     5. Scroll-to-top button
     6. Menu page: search + category filter
     7. Booking page: validation, localStorage, popup summary
     8. Contact page: form validation + fake submit status
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- 1. Loader ---------------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 350);
    });
    // fallback in case 'load' already fired
    setTimeout(() => loader.classList.add('hidden'), 1800);
  }

  /* ---------------- 2. Navbar ---------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    toggleScrollTopBtn();
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // close drawer when a link is tapped (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Mark active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------------- 3. Dark mode ---------------- */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('smartdine_theme', theme);
    themeToggleBtns.forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
  }

  const savedTheme = localStorage.getItem('smartdine_theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  /* ---------------- 4. Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------------- 5. Scroll to top ---------------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  function toggleScrollTopBtn() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('show', window.scrollY > 480);
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- 6. Menu page: search + filter ---------------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('menuSearch');
  const menuCards = document.querySelectorAll('.menu-grid .dish-card');
  const noResults = document.getElementById('noResults');
  let activeCategory = 'all';

  function applyMenuFilters() {
    if (!menuCards.length) return;
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    menuCards.forEach(card => {
      const category = card.dataset.category;
      const name = card.dataset.name?.toLowerCase() || '';
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = name.includes(query);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hide');
        visibleCount++;
      } else {
        card.classList.add('hide');
      }
    });

    if (noResults) noResults.classList.toggle('show', visibleCount === 0);
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.filter;
      applyMenuFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyMenuFilters);
  }

  /* ---------------- 7. Booking form ---------------- */
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    const fields = {
      name: document.getElementById('custName'),
      email: document.getElementById('custEmail'),
      phone: document.getElementById('custPhone'),
      date: document.getElementById('bookDate'),
      time: document.getElementById('bookTime'),
      guests: document.getElementById('guestCount'),
      seating: () => bookingForm.querySelector('input[name="seating"]:checked'),
      requests: document.getElementById('specialRequests')
    };

    // Prevent selecting a past date
    const dateInput = fields.date;
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    // Style radio pills on select
    document.querySelectorAll('.radio-pill').forEach(pill => {
      const input = pill.querySelector('input');
      input.addEventListener('change', () => {
        document.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
      });
    });

    function setError(fieldGroupId, message) {
      const group = document.getElementById(fieldGroupId);
      if (!group) return;
      const errorEl = group.querySelector('.error-msg');
      if (message) {
        group.classList.add('invalid');
        if (errorEl) errorEl.textContent = message;
      } else {
        group.classList.remove('invalid');
        if (errorEl) errorEl.textContent = '';
      }
    }

    function validateBookingForm() {
      let isValid = true;

      // Name
      if (!fields.name.value.trim() || fields.name.value.trim().length < 2) {
        setError('group-name', 'Please enter your full name.');
        isValid = false;
      } else {
        setError('group-name', '');
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(fields.email.value.trim())) {
        setError('group-email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        setError('group-email', '');
      }

      // Phone (10-15 digits, optional +)
      const phonePattern = /^\+?[0-9]{10,15}$/;
      if (!phonePattern.test(fields.phone.value.trim())) {
        setError('group-phone', 'Enter a valid phone number (10-15 digits).');
        isValid = false;
      } else {
        setError('group-phone', '');
      }

      // Date
      if (!fields.date.value) {
        setError('group-date', 'Please choose a booking date.');
        isValid = false;
      } else {
        const chosen = new Date(fields.date.value);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (chosen < now) {
          setError('group-date', 'Date cannot be in the past.');
          isValid = false;
        } else {
          setError('group-date', '');
        }
      }

      // Time
      if (!fields.time.value) {
        setError('group-time', 'Please choose a booking time.');
        isValid = false;
      } else {
        setError('group-time', '');
      }

      // Guests
      const guestVal = Number(fields.guests.value);
      if (!fields.guests.value || guestVal < 1 || guestVal > 20) {
        setError('group-guests', 'Enter between 1 and 20 guests.');
        isValid = false;
      } else {
        setError('group-guests', '');
      }

      // Seating
      if (!fields.seating()) {
        setError('group-seating', 'Please select a seating preference.');
        isValid = false;
      } else {
        setError('group-seating', '');
      }

      return isValid;
    }

    // live validation on blur
    ['custName', 'custEmail', 'custPhone', 'bookDate', 'bookTime', 'guestCount'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', validateBookingForm);
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateBookingForm()) return;

      const booking = {
        id: 'SD' + Date.now(),
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        date: fields.date.value,
        time: fields.time.value,
        guests: fields.guests.value,
        seating: fields.seating().value,
        requests: fields.requests.value.trim() || 'None',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('smartdine_bookings') || '[]');
      existing.push(booking);
      localStorage.setItem('smartdine_bookings', JSON.stringify(existing));

      showBookingSummary(booking);
      bookingForm.reset();
      document.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
    });

    function formatDateReadable(isoDate) {
      const d = new Date(isoDate);
      return d.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    }

    function showBookingSummary(booking) {
      const modal = document.getElementById('bookingModal');
      if (!modal) return;
      document.getElementById('summaryId').textContent = booking.id;
      document.getElementById('summaryName').textContent = booking.name;
      document.getElementById('summaryDate').textContent = formatDateReadable(booking.date);
      document.getElementById('summaryTime').textContent = booking.time;
      document.getElementById('summaryGuests').textContent = booking.guests;
      document.getElementById('summarySeating').textContent = booking.seating;
      document.getElementById('summaryPhone').textContent = booking.phone;
      modal.classList.add('open');
    }

    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('bookingModal');
    if (modalClose && modalOverlay) {
      modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('open');
      });
    }
  }

  /* ---------------- 8. Contact form ---------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusEl = document.getElementById('contactStatus');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName').value.trim();
      const email = document.getElementById('cEmail').value.trim();
      const message = document.getElementById('cMessage').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let valid = true;
      const nameGroup = document.getElementById('group-cname');
      const emailGroup = document.getElementById('group-cemail');
      const msgGroup = document.getElementById('group-cmessage');

      if (name.length < 2) {
        nameGroup.classList.add('invalid');
        nameGroup.querySelector('.error-msg').textContent = 'Please enter your name.';
        valid = false;
      } else {
        nameGroup.classList.remove('invalid');
        nameGroup.querySelector('.error-msg').textContent = '';
      }

      if (!emailPattern.test(email)) {
        emailGroup.classList.add('invalid');
        emailGroup.querySelector('.error-msg').textContent = 'Please enter a valid email.';
        valid = false;
      } else {
        emailGroup.classList.remove('invalid');
        emailGroup.querySelector('.error-msg').textContent = '';
      }

      if (message.length < 5) {
        msgGroup.classList.add('invalid');
        msgGroup.querySelector('.error-msg').textContent = 'Message is too short.';
        valid = false;
      } else {
        msgGroup.classList.remove('invalid');
        msgGroup.querySelector('.error-msg').textContent = '';
      }

      if (!valid) return;

      // Persist contact messages locally as well
      const messages = JSON.parse(localStorage.getItem('smartdine_messages') || '[]');
      messages.push({ name, email, message, sentAt: new Date().toISOString() });
      localStorage.setItem('smartdine_messages', JSON.stringify(messages));

      statusEl.textContent = 'Thanks, ' + name + '! Your message has been received — we will get back to you soon.';
      statusEl.classList.add('show', 'ok');
      contactForm.reset();

      setTimeout(() => statusEl.classList.remove('show'), 6000);
    });
  }

});
