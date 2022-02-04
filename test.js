// const n = 3;
// const str1 = n.toString();

// console.log(str1.padStart(2, '0'));

// const url = 'https://level.travel/search/Mineralnye.Vody-RU-to-Alanya-TR-departure-31.02.2022-for-7-nights-1-adults-0-kids-1..5-stars?sort_by=price,asc';

// const result = url.match(/()/)

// console.log(result);


// const day = new Date().getDate();
// const month = new Date().getMonth() + 1;


// console.log(day, month);


const parse = require('./parse/parse');

const url = 'https://level.travel/search/Mineralnye.Vody-RU-to-Alanya-TR-departure-08.02.2022-for-7-nights-1-adults-0-kids-1..5-stars?sort_by=price,asc'
parse(url)