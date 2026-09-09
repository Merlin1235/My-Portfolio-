/* LOADER */
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('gone'), 1800));

/* CURSOR */
const cur = document.getElementById('cur'), ring = document.getElementById('cur-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; });
(function tl() { rx += (cx - rx) * .12; ry += (cy - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(tl); })();

/* NAV SCROLL + BACK TO TOP */
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.boxShadow = window.scrollY > 40 ? '0 4px 30px rgba(0,0,0,.4)' : 'none';
  document.getElementById('btt').classList.toggle('on', window.scrollY > 400);
});

/* MOBILE NAV */
let mo = false;
function tmn() { mo = !mo; document.getElementById('mnav').classList.toggle('open', mo); }
function cmn() { mo = false; document.getElementById('mnav').classList.remove('open'); }

/* THEME */
function toggleTheme() {
  const h = document.documentElement, dark = h.getAttribute('data-theme') === 'dark';
  h.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.getElementById('ticon').className = dark ? 'fas fa-sun' : 'fas fa-moon';
}

/* TYPED */
const phrases = ['Software Developer', 'AI Enthusiast', 'Cybersecurity Student', 'Open Source Builder', 'Python Craftsman'];
let pi = 0, ci = 0, del = false, wait = false;
const tel = document.getElementById('typed');
function type() {
  if (wait) { wait = false; setTimeout(type, 1800); return; }
  const p = phrases[pi];
  if (!del) { tel.textContent = p.slice(0, ++ci); if (ci === p.length) { del = true; wait = true; setTimeout(type, 60); return; } setTimeout(type, 70); }
  else { tel.textContent = p.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 380); return; } setTimeout(type, 38); }
}
setTimeout(type, 1200);

/* PARTICLES */
const pc = document.getElementById('pcanvas'), pctx = pc.getContext('2d');
let pw, ph, pts = [];
function rp() { pw = pc.width = pc.offsetWidth; ph = pc.height = pc.offsetHeight; }
rp(); window.addEventListener('resize', rp);
for (let i = 0; i < 75; i++)pts.push({ x: Math.random() * pw, y: Math.random() * ph, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.2 + .4 });
function dp() {
  pctx.clearRect(0, 0, pw, ph);
  pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > pw) p.vx *= -1; if (p.y < 0 || p.y > ph) p.vy *= -1; });
  pts.forEach((a, i) => {
    pts.slice(i + 1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) { pctx.strokeStyle = `rgba(127,219,202,${.07 * (1 - d / 130)})`; pctx.lineWidth = .5; pctx.beginPath(); pctx.moveTo(a.x, a.y); pctx.lineTo(b.x, b.y); pctx.stroke(); }
    });
    pctx.beginPath(); pctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); pctx.fillStyle = 'rgba(127,219,202,.35)'; pctx.fill();
  });
  requestAnimationFrame(dp);
}
dp();

/* REVEAL */
const rvEls = document.querySelectorAll('.rv,.rvl,.rvr');
const rvObs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); } }); }, { threshold: .1 });
rvEls.forEach(el => rvObs.observe(el));

/* SKILL BARS + LANG BARS */
const fills = document.querySelectorAll('.sk-fill,.lg-fill');
const fObs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.w + '%'; fObs.unobserve(e.target); } }); }, { threshold: .3 });
fills.forEach(f => fObs.observe(f));

/* SKILLS TABS */
function stab(id, btn) {
  document.querySelectorAll('.sk-panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.sk-tab').forEach(t => t.classList.remove('on'));
  document.getElementById('sp-' + id).classList.add('on');
  btn.classList.add('on');
  document.querySelectorAll('#sp-' + id + ' .sk-fill').forEach(b => { setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 80); });
}

/* COUNT-UP */
const counts = document.querySelectorAll('[data-count]');
const cObs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, t = parseInt(el.dataset.count);
    let v = 0; const step = Math.max(1, Math.ceil(t / 60));
    const tm = setInterval(() => { v = Math.min(v + step, t); el.textContent = v; if (v >= t) clearInterval(tm); }, 18);
    cObs.unobserve(el);
  });
}, { threshold: .5 });
counts.forEach(el => cObs.observe(el));

/* CONTRIBUTION GRID */
(function () {
  const g = document.getElementById('cgrid');
  const lv = ['', 'l1', 'l2', 'l3', 'l4'], wt = [40, 25, 18, 12, 5];
  function pick() { let r = Math.random() * 100, s = 0; for (let i = 0; i < wt.length; i++) { s += wt[i]; if (r < s) return lv[i]; } return ''; }
  for (let i = 0; i < 364; i++) { const d = document.createElement('div'); d.className = 'cd ' + pick(); d.title = 'Contribution'; g.appendChild(d); }
})();

/* CONTACT FORM */
function sendForm(e) {
  e.preventDefault();
  const msg = document.getElementById('fmsg'), btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...'; btn.disabled = true;
  setTimeout(() => {
    msg.className = 'ok'; msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
    e.target.reset(); btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; btn.disabled = false;
  }, 1400);
}
