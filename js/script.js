const doctors = [
  ['Бабин','Вячеслав Вячеславович','Терапевт, кардиолог, аритмолог','Кандидат медицинских наук','therapy'],
  ['Бабина','Ирина Александровна','Ревматолог, терапевт, врач УЗИ','Функциональная диагностика','therapy'],
  ['Калинина','Екатерина Николаевна','Терапевт','','therapy'],
  ['Закройщикова','Инесса Владимировна','Невролог','Кандидат медицинских наук','neuro'],
  ['Ганин','Дмитрий Алексеевич','Невролог','','neuro'],
  ['Свиридонова','Марина Александровна','Эндокринолог, диетолог','Кандидат медицинских наук','therapy'],
  ['Куренков','Андрей Владимирович','Педиатр','','children'],
  ['Харзиани','Елена Валерьевна','Клинический психолог','','psychology'],
  ['Мавлиева','Радмила Руслановна','Психолог','','psychology'],
  ['Кузнецов','Павел Андреевич','Акушер-гинеколог','Кандидат медицинских наук','women'],
  ['Голубкова','Наталья Сергеевна','Акушер-гинеколог, гинеколог-эндокринолог, врач УЗИ','','women'],
  ['Павличенко','Светлана Николаевна','Терапевт, кардиолог, диетолог','Клинический фармаколог, к. м. н.','therapy'],
  ['Кузина','Дарья Евгеньевна','Детский гастроэнтеролог','','children'],
  ['Исакова','Светлана Сергеевна','Терапевт, гастроэнтеролог','','therapy']
];
const grid = document.querySelector('[data-doctor-grid]');
const colors = ['lilac','sage','sand'];
function renderDoctors(filter = 'all', expanded = false) {
  const list = doctors.filter(d => filter === 'all' || d[4] === filter);
  grid.innerHTML = list.map((d,i) => `<article class="doctor-card ${!expanded && i > 5 ? 'doctor-card--hidden' : ''}"><div class="doctor-photo ${colors[i%3]}" aria-hidden="true"><span>${d[0][0]}${d[1][0]}</span><i></i></div><div class="doctor-card__body"><h3>${d[0]}<br>${d[1]}</h3><p>${d[2]}</p>${d[3] ? `<small>${d[3]}</small>` : '<small>&nbsp;</small>'}<button class="text-button open-modal" type="button">Записаться →</button></div></article>`).join('');
  document.querySelector('[data-doctor-more]').hidden = list.length <= 6;
  bindModals();
}
renderDoctors();
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active'); btn.classList.add('active'); renderDoctors(btn.dataset.filter, false);
}));
document.querySelector('[data-doctor-more]').addEventListener('click', e => { document.querySelectorAll('.doctor-card--hidden').forEach(c => c.classList.remove('doctor-card--hidden')); e.currentTarget.hidden = true; });
const modal = document.querySelector('.modal');
function bindModals(){ document.querySelectorAll('.open-modal').forEach(b => b.onclick = () => modal.showModal()); }
bindModals();
document.querySelector('.modal__close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if(e.target === modal) modal.close(); });
modal.querySelector('form').addEventListener('submit', e => { e.preventDefault(); e.currentTarget.hidden = true; modal.querySelector('.form-success').hidden = false; });
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); document.querySelector('.nav-menu').classList.toggle('open'); });
document.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded','false'); document.querySelector('.nav-menu').classList.remove('open'); }));
const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }}), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
