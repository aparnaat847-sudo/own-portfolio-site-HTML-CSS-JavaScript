const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const root = document.documentElement;

/* theme */
try{ root.dataset.theme = localStorage.getItem('theme') || 'dark'; }catch{ root.dataset.theme = 'dark'; }
const icon = () => $('#theme').textContent = root.dataset.theme === 'light' ? '☀️' : '🌙';
icon();
$('#theme').onclick = () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try{ localStorage.setItem('theme', root.dataset.theme); }catch{}
  icon();
};

/* mobile menu */
$('#burger').onclick = () => $('#menu').classList.toggle('open');
$$('#menu a').forEach(a => a.addEventListener('click', () => $('#menu').classList.remove('open')));

/* typing effect */
const roles = ['Web Developer', 'Mobile App Developer', 'Problem Solver', 'CSE Student'];
let ri = 0, ci = 0, del = false;
(function type(){
  const w = roles[ri];
  $('#typed').textContent = w.slice(0, ci);
  if(!del && ci === w.length){ del = true; return setTimeout(type, 1500); }
  if(del && ci === 0){ del = false; ri = (ri + 1) % roles.length; }
  ci += del ? -1 : 1;
  setTimeout(type, del ? 45 : 95);
})();

/* scroll reveal (staggered) + counters */
$$('.cards .rv, .grid3 .rv, .stats').forEach((el, i) => el.style.transitionDelay = (i % 3) * 90 + 'ms');
const count = el => { const to = +el.dataset.count; let n = 0; const t = setInterval(() => { el.textContent = ++n; if(n >= to) clearInterval(t); }, 110); };
const io = new IntersectionObserver(es => es.forEach(e => {
  if(!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(count);
  io.unobserve(e.target);
}), { threshold: .12 });
$$('.rv').forEach(el => io.observe(el));

/* active nav link */
const links = $$('#menu a');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if(e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach(s => spy.observe(s));

/* project filter */
$$('.f').forEach(b => b.onclick = () => {
  $$('.f').forEach(x => x.classList.toggle('active', x === b));
  $$('.card').forEach(c => c.classList.toggle('hide', b.dataset.f !== 'all' && c.dataset.cat !== b.dataset.f));
});

/* contact form opens the visitor's email app */
$('#form').onsubmit = e => {
  e.preventDefault();
  const body = `Name: ${$('#fname').value}\nEmail: ${$('#femail').value}\n\n${$('#fmsg').value}`;
  location.href = 'mailto:your.email@example.com?subject=' + encodeURIComponent('Portfolio message from ' + $('#fname').value) + '&body=' + encodeURIComponent(body);
};

/* nav shadow, progress bar, back-to-top */
addEventListener('scroll', () => {
  const h = document.documentElement;
  $('#nav').classList.toggle('stuck', scrollY > 20);
  $('#progress').style.width = (scrollY / (h.scrollHeight - h.clientHeight) * 100) + '%';
  $('#top').classList.toggle('show', scrollY > 600);
}, { passive: true });
$('#top').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
$('#year').textContent = new Date().getFullYear();