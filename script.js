document.addEventListener('DOMContentLoaded', () => {
// mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

  // custom cursor
  const dot = document.getElementById('curDot');
  const ring = document.getElementById('curRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('a, button, .case, .service-row, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });

  // reveal
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }}), { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // clock
  function tick() {
    const d = new Date();
    document.getElementById('clock').textContent = d.toLocaleTimeString('en-GB');
  }
  tick(); setInterval(tick, 1000);

  // scroll progress
  const sb = document.getElementById('scrollbar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    sb.style.width = pct + '%';
  }, { passive: true });

  // case studies
  const cases = [
    { name: 'MWAKA HEALTH', tag: '2025 · BRAND + WEB', cat: 'IDENTITY', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80' },
    { name: 'KOVA TECH', tag: '2025 · WEB + MOTION', cat: 'WEBSITE', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80' },
    { name: 'OTAKUCITY', tag: '2026 · BRAND + DROP', cat: 'IDENTITY', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80' },
    { name: 'ILÉ PROPERTIES', tag: '2025 · BRAND + WEB', cat: 'WEBSITE', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80' },
    { name: 'SOLÈNE LAGOS', tag: '2024 · IDENTITY', cat: 'IDENTITY', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80' },
    { name: 'NORTH/STAR FUND', tag: '2024 · PRODUCT UI', cat: 'PRODUCT', img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1000&q=80' },
    { name: 'BANYA HOTEL', tag: '2024 · BRAND', cat: 'IDENTITY', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80' },
    { name: 'METHODE COFFEE', tag: '2024 · PACKAGING', cat: 'IDENTITY', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80' }
  ];

  function caseCard(c) {
    return `
      <a href="#" class="case reveal block aspect-[4/5] group">
        <div class="absolute inset-0 overflow-hidden">
          <img src="${c.img}" alt="${c.name}" class="case-img w-full h-full object-cover" loading="lazy"/>
        </div>
        <div class="case-content absolute inset-0 flex flex-col justify-between p-5">
          <div class="flex justify-between text-[10px] font-mono uppercase tracking-widest text-paper group-hover:text-ink transition">
            <span>[${c.cat}]</span>
            <span>${c.tag.split(' · ')[0]}</span>
          </div>
          <div>
            <h3 class="display-xl text-2xl md:text-3xl text-paper group-hover:text-ink transition leading-tight">${c.name}</h3>
            <p class="mt-1 text-[11px] font-mono uppercase tracking-widest text-paper/70 group-hover:text-ink/70 transition">${c.tag}</p>
          </div>
        </div>
      </a>
    `;
  }
  document.getElementById('caseGrid').innerHTML = cases.map(caseCard).join('');
  document.querySelectorAll('.case.reveal').forEach(el => io.observe(el));

  // brief form
  document.getElementById('briefForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.querySelectorAll('input, select, textarea, button').forEach(el => el.disabled = true);
    document.getElementById('briefOk').classList.remove('hidden');
  });
});
