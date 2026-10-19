import fs from 'node:fs';
import '../js/puzzle-engine.js';
import '../data/puzzles.js';
const skin=['#edc6a8','#d5a17d','#b97d5a','#f1d6bd','#915e46','#c48c69'];
const hair=['#372d29','#695044','#977151','#c9b7a0','#513c31','#8e5f46','#56595c'];
const coats=['#546c79','#805e69','#688375','#ad8c58','#666080','#9a695c','#506975','#68705d','#806a58','#967780','#536467'];
const cuts=[
 'M25 36Q23 4 51 12Q78 9 76 37L65 29 55 20 45 29Z',
 'M24 38Q13 8 46 12Q71 2 77 35L60 22 37 34Z',
 'M24 36Q20 15 34 14Q43 3 52 14Q67 3 75 21L78 36 61 26 45 31 30 26Z',
 'M25 32Q28 6 56 12Q77 16 75 37L69 26 47 20 31 31Z',
 'M23 38Q14 6 51 9Q84 7 78 52L73 58 70 26 50 20 29 35 29 65 20 64Z',
 'M23 38Q24 7 49 11Q82 7 78 41L70 25Q42 44 23 38Z',
 'M25 32Q28 13 38 15L35 28M64 15Q76 20 75 36L67 29Z'
];
const women=new Set('Анна Даша Елена Галина Кира Марина Полина София Ульяна Яна Ася Дина Жанна Зоя Лада Нина Рита Саша Вера Инна Лина Майя Белла Эмма Алина Влада Дарья Ева Ирина Людмила Нелли Раиса Таисия Элина Агата Виола Диана Злата Лилия Оксана Света'.split(' '));
const longCuts=[
 'M23 42Q13 8 48 8Q81 7 78 48L77 76 63 78 66 38 55 22Q41 37 29 36L32 76 19 73Z',
 'M24 38Q14 9 43 9Q69 0 78 31L82 65 69 72 65 31Q42 43 27 38L30 71 17 67Z',
 'M23 38Q21 11 44 10Q57 1 71 16L78 35 67 30 56 20Q45 38 23 38Z',
 'M22 39Q14 17 30 14Q40 2 55 12Q77 4 80 28L77 61 68 68 68 31 56 25 40 31 29 26 30 66 18 62Z'
];
let i=0;
for(const person of DS.puzzles.flatMap(p=>p.suspects)){
 const n=i++,tone=skin[n%skin.length],h=hair[Math.floor(n/3)%hair.length],coat=coats[n%coats.length],female=women.has(person.name.ru);
 const eyes=9+n%4,rx=21+n%3,glasses=n%4===0?`<g fill="none" stroke="#48413b" stroke-width="1.7"><rect x="29" y="40" width="18" height="12" rx="4"/><rect x="53" y="40" width="18" height="12" rx="4"/><path d="M47 45h6"/></g>`:'';
 const facial=!female&&n%6===2?'<path d="M40 59q10-9 20 0l-10-2z" fill="'+h+'"/>':!female&&n%6===3?'<path d="M30 55q20 27 40 0Q65 76 50 76T30 55" fill="'+h+'" opacity=".7"/>':'';
 const jewellery=female&&n%3===1?'<g fill="#d6ae59"><circle cx="25" cy="55" r="3"/><circle cx="75" cy="55" r="3"/></g>':'';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${['#e9d4b5','#bdd5c9','#e1c6c7','#c8d4e5','#d6d8b4','#d4c6df'][n%6]}"/><path d="M8 100Q10 75 43 73H57Q90 75 92 100" fill="${coat}" stroke="#48483f" stroke-width="1.7"/><path d="M42 64v13l8 10 8-10V64" fill="${tone}"/><path d="M37 76l13 11-10 8-9-17m32-2L50 87l10 8 9-17" fill="#fcf5e8" opacity=".8"/><ellipse cx="50" cy="44" rx="${female?rx-1:rx}" ry="28" fill="${tone}" stroke="#855e49" stroke-width="1.2"/>${jewellery}<path d="${female?longCuts[n%longCuts.length]:cuts[n%7]}" fill="${h}" stroke="${h}" stroke-width="2"/><path d="M${47-eyes} 38h-8m${14+2*eyes} 0h8" stroke="${h}" stroke-width="2" stroke-linecap="round"/><g fill="#37312c"><circle cx="${50-eyes}" cy="45" r="1.8"/><circle cx="${50+eyes}" cy="45" r="1.8"/></g><path d="M49 47l-2 8h5M44 62q6 ${n%3+2} 12 0" fill="none" stroke="#875e4b" stroke-width="1.6" stroke-linecap="round"/>${facial}${glasses}</svg>`;
 fs.writeFileSync(person.avatar,svg+'\n');
}
console.log(`${i} distinct original SVG portraits written.`);
