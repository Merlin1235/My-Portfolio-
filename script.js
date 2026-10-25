document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));

const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('b').textContent = open ? '−' : '+';
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
