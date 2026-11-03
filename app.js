(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const config = window.COMPANY;
  if (!config) return;
  // Company data is isolated so future copies can replace real facts together.
  $$('[data-company-phone]').forEach(link => {
    link.href = config.phoneHref;
    if (link.classList.contains('header-phone') || link.parentElement.classList.contains('mobile-menu')) link.textContent = config.phone;
    if (link.classList.contains('contact-call')) $('span', link).textContent = config.phone;
  });
  $$('[data-company-email]').forEach(link => { link.href = `mailto:${config.email}`; });
  $$('[data-company-address]').forEach(el => { el.textContent = config.address; });
  $$('[data-company-hours]').forEach(el => { el.textContent = config.hours; });
  $$('[data-company-map]').forEach(el => { el.href = config.mapUrl; });
  $$('[data-company-source]').forEach(el => { el.href = config.source; });

  const menuToggle = $('.menu-toggle');
  const menu = $('#mobile-menu');
  function closeMenu() {
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Открыть меню');
  }
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  $$('.site-header a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuToggle.focus(); }
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !event.target.closest('.site-header')) closeMenu();
  });

  const tabs = $$('.service-tab');
  const panel = $('#service-panel');
  const serviceSelect = $('#service-choice');
  function selectService(id, focus = false) {
    const item = config.services.find(service => service.id === id);
    if (!item) return;
    tabs.forEach(tab => {
      const selected = tab.dataset.service === id;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus({ preventScroll: true });
    });
    panel.setAttribute('aria-labelledby', `tab-${id}`);
    $('#service-title').textContent = item.title;
    $('#service-description').textContent = item.detail;
    $('#service-tags').replaceChildren(...item.tags.map(tag => {
      const el = document.createElement('span'); el.textContent = tag; return el;
    }));
    $('.mechanism-scene').dataset.zone = item.zone;
    serviceSelect.value = id;
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectService(tab.dataset.service));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectService(tabs[next].dataset.service, true);
      tabs[next].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    });
  });

  // Three deliberate rounds, with a lock against repeated or rapid input.
  const rounds = [
    { question: 'На неровной дороге появился стук.', hint: 'Какое направление проверки стоит обсудить первым?', correct: 'suspension', feedback: 'Верно. В этой игровой ситуации начинаем с проверки ходовой.' },
    { question: 'При торможении появился скрежет.', hint: 'Какая система требует внимания в этой игровой ситуации?', correct: 'brakes', feedback: 'Верно. Тормозную систему нужно проверить у специалиста.' },
    { question: 'На панели загорелся индикатор двигателя.', hint: 'Что поможет прочитать сохранённые системой ошибки?', correct: 'electronics', feedback: 'Верно. Для чтения ошибок используют компьютерную диагностику.' }
  ];
  let roundIndex = 0;
  let locked = false;
  let roundTimer = 0;
  const answerButtons = $$('.game-options button');
  function scoreUpdate(score) {
    $('#game-score').innerHTML = `${score}<span>/ 3</span>`;
    $('#gauge-progress').setAttribute('stroke-dasharray', `${score / 3 * 100} 100`);
    $('.game-instrument').style.setProperty('--needle', `${score / 3 * 136}deg`);
    $$('.game-statuses>span').forEach((status, index) => status.classList.toggle('is-complete', index < score));
  }
  function showRound(focusQuestion = false) {
    const round = rounds[roundIndex];
    $('#game-round').textContent = `Ситуация ${roundIndex + 1} из 3`;
    $('#game-question').textContent = round.question;
    $('#game-hint').textContent = round.hint;
    $('#game-feedback').textContent = 'Выберите один ответ.';
    $('#game-feedback').classList.remove('is-error');
    answerButtons.forEach(button => { button.disabled = false; button.classList.remove('is-correct', 'is-wrong'); });
    locked = false;
    if (focusQuestion) {
      $('#game-question').tabIndex = -1;
      $('#game-question').focus({ preventScroll: true });
    }
  }
  function startGame() {
    clearTimeout(roundTimer);
    roundIndex = 0; locked = false;
    $('#game-intro').hidden = true;
    $('#game-finish').hidden = true;
    $('#game-active').hidden = false;
    scoreUpdate(0); showRound(true);
  }
  $('#game-start').addEventListener('click', startGame);
  $('#game-restart').addEventListener('click', startGame);
  $('#game-restart-active').addEventListener('click', startGame);
  answerButtons.forEach(button => button.addEventListener('click', () => {
    if (locked || roundIndex >= rounds.length) return;
    const round = rounds[roundIndex];
    answerButtons.forEach(option => option.classList.remove('is-wrong'));
    if (button.dataset.answer !== round.correct) {
      button.classList.add('is-wrong');
      $('#game-feedback').classList.add('is-error');
      $('#game-feedback').textContent = 'Это другое направление. Прочитайте ситуацию и попробуйте ещё раз.';
      return;
    }
    locked = true;
    button.classList.add('is-correct');
    answerButtons.forEach(option => { option.disabled = true; });
    $('#game-feedback').classList.remove('is-error');
    $('#game-feedback').textContent = round.feedback;
    roundIndex += 1; scoreUpdate(roundIndex);
    roundTimer = window.setTimeout(() => {
      if (roundIndex === rounds.length) {
        $('#game-active').hidden = true;
        $('#game-finish').hidden = false;
        $('#game-finish h3').tabIndex = -1;
        $('#game-finish h3').focus({ preventScroll: true });
        locked = false;
      } else showRound(true);
    }, 950);
  }));

  const form = $('#booking-form');
  const nameInput = $('#customer-name');
  const phoneInput = $('#customer-phone');
  function clearFieldError(input, errorId) {
    input.removeAttribute('aria-invalid');
    $(`#${errorId}`).textContent = '';
  }
  nameInput.addEventListener('input', () => clearFieldError(nameInput, 'name-error'));
  phoneInput.addEventListener('input', () => clearFieldError(phoneInput, 'phone-error'));
  form.addEventListener('submit', event => {
    event.preventDefault();
    clearFieldError(nameInput, 'name-error');
    clearFieldError(phoneInput, 'phone-error');
    let firstInvalid = null;
    if ((nameInput.value.match(/\p{L}/gu) || []).length < 2) {
      nameInput.setAttribute('aria-invalid', 'true');
      $('#name-error').textContent = 'Введите имя — не меньше двух букв.';
      firstInvalid = nameInput;
    }
    const digits = phoneInput.value.replace(/\D/g, '');
    const validPhone = /^\d{10}$/.test(digits) || /^[78]\d{10}$/.test(digits);
    if (!validPhone || /^([0-9])\1+$/.test(digits)) {
      phoneInput.setAttribute('aria-invalid', 'true');
      $('#phone-error').textContent = 'Введите российский номер: 10 цифр или 11 с 7/8 в начале.';
      firstInvalid ||= phoneInput;
    }
    if (firstInvalid) { firstInvalid.focus(); return; }
    // The demo never transmits, persists or logs personal data.
    form.reset();
    form.hidden = true;
    $('#form-success').hidden = false;
    $('#form-success').focus({ preventScroll: true });
  });
  $('#booking-submit').disabled = false;
  $('#form-reset').addEventListener('click', () => {
    $('#form-success').hidden = true;
    form.hidden = false;
    form.reset();
    clearFieldError(nameInput, 'name-error'); clearFieldError(phoneInput, 'phone-error');
    nameInput.focus({ preventScroll: true });
  });

  const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = $('#motion-toggle');
  let userMotion = null;
  const scenes = $$('[data-motion]');
  const visibleScenes = new Set();
  let motionEnabled = !motionMedia.matches;
  let frame = 0;
  function updateMotionPreference() {
    motionEnabled = userMotion === null ? !motionMedia.matches : userMotion;
    document.documentElement.toggleAttribute('data-motion-off', !motionEnabled);
    motionButton.setAttribute('aria-pressed', String(motionEnabled));
    motionButton.textContent = `Анимация: ${motionEnabled ? 'вкл' : 'выкл'}`;
    scenes.forEach(scene => {
      scene.style.setProperty('--px', 0); scene.style.setProperty('--py', 0);
      scene.style.setProperty('--progress', motionEnabled ? 0 : 1);
    });
    scheduleScroll();
  }
  function updateScroll() {
    frame = 0;
    if (!motionEnabled) return;
    const height = window.innerHeight;
    visibleScenes.forEach(scene => {
      const top = scene.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, (height - top) / (height * .95)));
      scene.style.setProperty('--progress', progress.toFixed(4));
    });
  }
  function scheduleScroll() { if (!frame) frame = requestAnimationFrame(updateScroll); }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleScenes.add(entry.target);
      else visibleScenes.delete(entry.target);
    });
    scheduleScroll();
  }, { rootMargin: '100px 0px 100px 0px' });
  scenes.forEach(scene => {
    observer.observe(scene);
    let box = null;
    let pointerFrame = 0;
    let pointerX = 0, pointerY = 0;
    function paintPointer() {
      pointerFrame = 0;
      if (!motionEnabled || !box) return;
      const x = Math.max(0, Math.min(1, (pointerX - box.left) / box.width));
      const y = Math.max(0, Math.min(1, (pointerY - box.top) / box.height));
      scene.style.setProperty('--px', ((x - .5) * 2).toFixed(3));
      scene.style.setProperty('--py', ((y - .5) * 2).toFixed(3));
      scene.style.setProperty('--pointer-x', `${x * 100}%`);
      scene.style.setProperty('--pointer-y', `${y * 100}%`);
      scene.style.setProperty('--lit', '1');
    }
    scene.addEventListener('pointerenter', () => { box = scene.getBoundingClientRect(); });
    scene.addEventListener('pointermove', event => {
      if (!motionEnabled) return;
      box ||= scene.getBoundingClientRect();
      pointerX = event.clientX; pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
    }, { passive: true });
    scene.addEventListener('pointerdown', event => {
      box = scene.getBoundingClientRect(); pointerX = event.clientX; pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
    }, { passive: true });
    scene.addEventListener('pointerleave', () => {
      cancelAnimationFrame(pointerFrame); pointerFrame = 0; box = null;
      scene.style.setProperty('--px', 0); scene.style.setProperty('--py', 0); scene.style.setProperty('--lit', 0);
    });
  });
  motionButton.addEventListener('click', () => { userMotion = !motionEnabled; updateMotionPreference(); });
  motionMedia.addEventListener('change', updateMotionPreference);
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); scheduleScroll(); }, { passive: true });
  window.addEventListener('pageshow', scheduleScroll);
  window.addEventListener('pagehide', () => { clearTimeout(roundTimer); cancelAnimationFrame(frame); });
  updateMotionPreference();
})();
