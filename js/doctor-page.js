const pageKey=document.body.dataset.doctorKey;
const doctor=doctorProfiles[pageKey];
if(sessionStorage.getItem('ametist-preview-access')!=='granted')location.replace('../index.html');
if(!doctor)location.replace('../index.html#doctors');

const rootPath=path=>`../${path}`;
const list=items=>`<ul class="doctor-profile__list">${items.map(item=>`<li>${item}</li>`).join('')}</ul>`;
const paragraphs=items=>items.map(item=>`<p>${item}</p>`).join('');
const section=(title,content)=>`<section><h2>${title}</h2>${content}</section>`;
const facts=[...doctor.facts,['Стоимость приёма','5 000 ₽'],['Онлайн-консультация','5 000 ₽']]
 .map(([term,value])=>`<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
const education=`<ul class="doctor-profile__timeline">${doctor.education.map(([title,place])=>`<li><strong>${title}</strong><span>${place}</span></li>`).join('')}</ul>`;
const faq=doctor.faq.map(([question,answer])=>`<details><summary>${question}</summary><p>${answer}</p></details>`).join('');

document.title=`${doctor.name} — клиника «Аметист»`;
document.querySelector('[data-doctor-name]').textContent=doctor.name;
document.querySelector('[data-doctor-specialties]').textContent=doctor.specialties;
document.querySelector('[data-doctor-intro]').textContent=doctor.intro;
const photo=document.querySelector('[data-doctor-photo]');
photo.src=rootPath(doctor.photo);photo.alt=doctor.name;
const png=rootPath(doctor.photo.replace(/\.svg$/i,'.png'));const probe=new Image();probe.onload=()=>{photo.src=png};probe.src=png;
const authoredArticles=typeof blogArticles==='undefined'?[]:blogArticles.filter(article=>article.authorKey===pageKey);
const articles=authoredArticles.length?section('Статьи врача',`<div class="doctor-articles">${authoredArticles.map(article=>`<a href="../blog/${article.url}"><span>${article.category} · ${article.dateLabel}</span><strong>${article.title}</strong><small>${article.description}</small></a>`).join('')}</div>`):'';
document.querySelector('[data-doctor-content]').innerHTML=section('Краткая информация',`<dl class="doctor-profile__facts">${facts}</dl>`)+section('Профессиональная экспертиза',paragraphs(doctor.expertise))+`<blockquote class="doctor-profile__quote">«${doctor.quote}»</blockquote>`+section('Специализация',list(doctor.specialization))+section('С какими вопросами можно обратиться',list(doctor.reasons))+section('Образование',education)+section('Повышение квалификации',`<p>${doctor.training}</p>`)+section('Опыт работы',`<p>${doctor.experience}</p>`)+(doctor.science?section('Научная и профессиональная деятельность',`<p>${doctor.science}</p>`):'')+section('Часто задаваемые вопросы',faq)+articles;
