const NUMS = [1,2,3,5,6,7,8,9,11,14,15,16,17,19,21,22,24,25,27,28,30,31,32,35];
const LANGS = ['ja', 'en', 'fr'];
let currentLang = 'en';

function buildSlides() {
  const main = document.getElementById('slides');
  main.innerHTML = '';
  NUMS.forEach(n => {
    const div = document.createElement('div');
    div.className = 'slide';
    const img = document.createElement('img');
    img.src = `images/instructions/${n}-${currentLang}.png`;
    img.alt = `Slide ${n}`;
    img.loading = 'lazy';
    div.appendChild(img);
    main.appendChild(div);
  });
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('.slide img').forEach((img, i) => {
    img.src = `images/instructions/${NUMS[i]}-${lang}.png`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildSlides();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
