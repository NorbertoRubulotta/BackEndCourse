const moment = require('moment');


const today = moment();
const birth = moment("13/04/1990", "DD/MM/YYYY");

const difYear = today.diff(birth, 'years');
const difDays = today.diff(birth, 'days');


console.log(`Today is ${today.format("DD/MM/YYYY")}`);
console.log(`I was born ${birth.format("DD/MM/YYYY")}`);
console.log(`${difYear} years have passed since my birthday`);
console.log(`${difDays} days have passed since my birthday`);

