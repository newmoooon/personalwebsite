/* ============================================================
   TAB / PAGE NAVIGATION
   ============================================================ */
const pages    = document.querySelectorAll('.page');
const navTabs  = document.querySelectorAll('.nav-tab');
const mobTabs  = document.querySelectorAll('.mobile-tab');
const ctaBtns  = document.querySelectorAll('[data-tab]');

function showPage(name) {
  pages.forEach(p => p.classList.remove('active'));
  navTabs.forEach(t => t.classList.remove('active'));
  mobTabs.forEach(t => t.classList.remove('active'));

  const target = document.getElementById('page-' + name);
  if (target) target.classList.add('active');

  navTabs.forEach(t => { if (t.dataset.tab === name) t.classList.add('active'); });
  mobTabs.forEach(t => { if (t.dataset.tab === name) t.classList.add('active'); });

  window.scrollTo({ top: 0, behavior: 'instant' });

  if (name === 'experience') animateTimeline();
  if (name === 'projects')   animateProjects();

  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
}

ctaBtns.forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.tab));
});


/* ============================================================
   HAMBURGER
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});


/* ============================================================
   TIMELINE ENTRANCE ANIMATION
   ============================================================ */
function animateTimeline() {
  document.querySelectorAll('.tl-item').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => el.classList.add('visible'), delay + 80);
  });
}


/* ============================================================
   PROJECT FILTER + ANIMATION
   ============================================================ */
function animateProjects() {
  document.querySelectorAll('.proj-card').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => el.classList.add('visible'), delay + 60);
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(card => {
      const cats = card.dataset.category || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
        card.classList.remove('visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => card.classList.add('visible'));
        });
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });
  });
});


/* ============================================================
   CONTACT FORM
   ============================================================ */
const form          = document.getElementById('contactForm');
const submitBtn     = document.getElementById('submitBtn');
const submitText    = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const formStatus    = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitText.textContent = 'Sending...';
  submitSpinner.classList.remove('hidden');
  formStatus.classList.add('hidden');

  const mailtoSubject = encodeURIComponent(subject || `Portfolio contact from ${name}`);
  const mailtoBody    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailto = `mailto:xyw721@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  await new Promise(r => setTimeout(r, 600));

  window.location.href = mailto;

  showStatus("Opening your email client — thanks for reaching out!", 'success');
  form.reset();
  submitBtn.disabled = false;
  submitText.textContent = 'Send Message';
  submitSpinner.classList.add('hidden');
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ============================================================
   NAVBAR SCROLL SHRINK
   ============================================================ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.height = window.scrollY > 20 ? '52px' : 'var(--nav-h)';
});
