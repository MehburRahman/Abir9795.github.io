document.documentElement.classList.add('js');

const themeButton = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme, remember = true) {
  document.documentElement.dataset.theme = theme;
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  if (themeButton) {
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('title', label);
    themeButton.querySelector('.theme-toggle-label').textContent = label;
  }
  if (themeMeta) themeMeta.content = theme === 'light' ? '#f6f5ef' : '#111813';
  if (remember) {
    try { localStorage.setItem('mehbur-theme', theme); } catch { /* Theme switching also works without storage. */ }
  }
}

setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark', false);
themeButton?.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 821px)').addEventListener('change', closeMenu);

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-categories]')];
const projectCount = document.querySelector('.project-count');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let visible = 0;
    projects.forEach(project => {
      const matches = filter === 'all' || project.dataset.categories.split(' ').includes(filter);
      project.hidden = !matches;
      if (matches) visible++;
    });
    projectCount.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
  });
});

document.querySelectorAll('[data-dialog]').forEach(button => {
  const dialog = document.getElementById(button.dataset.dialog);
  // The notes are progressive enhancement; the project and source link remain in the page.
  if (typeof dialog.showModal !== 'function') {
    button.hidden = true;
    return;
  }
  button.addEventListener('click', () => {
    closeMenu();
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    button.focus({ preventScroll: true });
  });
});

const copyButton = document.querySelector('[data-copy-email]');
const copyLabel = copyButton?.querySelector('.copy-label');
const copyStatus = document.querySelector('.copy-status');
let copyReset;
copyButton?.addEventListener('click', async () => {
  clearTimeout(copyReset);
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
    copyLabel.textContent = 'Email copied';
    copyStatus.textContent = 'Email address copied to your clipboard.';
  } catch {
    copyLabel.textContent = 'Select the address above to copy';
    copyStatus.textContent = `Email address: ${copyButton.dataset.copyEmail}`;
  }
  copyReset = setTimeout(() => {
    copyLabel.textContent = 'Copy email address';
    copyStatus.textContent = '';
  }, 4000);
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = contactForm?.querySelector('.form-status');
const submitButton = contactForm?.querySelector('button[type="submit"]');
const submitLabel = submitButton?.querySelector('.submit-label');
let isSending = false;

contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (isSending) return;

  const name = contactForm.elements.namedItem('name');
  const email = contactForm.elements.namedItem('email');
  const message = contactForm.elements.namedItem('message');
  name.value = name.value.trim();
  email.value = email.value.trim();
  message.value = message.value.trim();
  name.setCustomValidity(name.value ? '' : 'Please enter your name.');
  message.setCustomValidity(message.value.length >= 10 ? '' : 'Please write a message of at least 10 characters.');
  if (!contactForm.reportValidity()) return;

  const payload = Object.fromEntries(new FormData(contactForm));
  payload._url = window.location.href.split('#')[0];
  const fields = [name, email, message];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  isSending = true;
  submitButton.disabled = true;
  submitLabel.textContent = 'Sending…';
  fields.forEach(field => { field.readOnly = true; });
  contactForm.setAttribute('aria-busy', 'true');
  formStatus.textContent = 'Sending your message…';
  formStatus.dataset.state = 'pending';

  try {
    const response = await fetch(contactForm.dataset.submitEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      throw new Error('Submission was not confirmed');
    }
    contactForm.reset();
    formStatus.textContent = 'Thanks! Your message has been sent. I’ll get back to you by email.';
    formStatus.dataset.state = 'success';
  } catch {
    formStatus.textContent = 'Couldn’t confirm your message was sent. Your message is still here — please try again or use the email link.';
    formStatus.dataset.state = 'error';
  } finally {
    clearTimeout(timeout);
    isSending = false;
    submitButton.disabled = false;
    submitLabel.textContent = 'Send message';
    fields.forEach(field => { field.readOnly = false; });
    contactForm.removeAttribute('aria-busy');
  }
});
if (submitButton) submitButton.disabled = false;
contactForm?.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => field.setCustomValidity(''));
});

if ('IntersectionObserver' in window && navigation) {
  const navLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    const current = `#${visible[0].target.id}`;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
