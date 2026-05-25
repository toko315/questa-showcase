const NUMS = [1,2,3,5,6,7,8,9,11,14,15,16,17,18,19,20,21,22,23,24,25,27,28,30,31,32,35];
const ICON_MAP = { 30: 'icon3', 31: 'icon4', 32: 'icon2' };
let currentLang = 'en';
let currentCourse = null;

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.getElementById('map-img').src = `images/slide/${lang}.png`;
  if (currentCourse !== null) renderModal(currentCourse);
}

function buildGrid() {
  const grid = document.getElementById('icon-grid');
  NUMS.forEach(n => {
    const item = document.createElement('div');
    item.className = 'icon-item';

    const img = document.createElement('img');
    img.src = `images/icon/${ICON_MAP[n] || 'course' + n}.png`;
    img.alt = `Course ${n}`;
    img.onerror = () => { img.src = 'images/icon/default.png'; img.onerror = null; };

    item.appendChild(img);
    item.addEventListener('click', () => openModal(n));
    grid.appendChild(item);
  });
}

function renderModal(n) {
  const content = document.getElementById('modal-content');
  content.innerHTML = '';
  const img = document.createElement('img');
  img.src = `images/instructions/${n}-${currentLang}.png`;
  img.alt = `Course ${n}`;
  content.appendChild(img);
}

function openModal(n) {
  currentCourse = n;
  renderModal(n);
  const modal = document.getElementById('modal');
  modal.hidden = false;
  modal.querySelector('.modal-box').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').hidden = true;
  document.body.style.overflow = '';
  currentCourse = null;
}

document.addEventListener('DOMContentLoaded', () => {
  buildGrid();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.querySelector('.modal-backdrop').addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
