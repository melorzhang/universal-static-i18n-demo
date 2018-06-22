const locale = require('../locale/en.js');
const lang = "en";
if (!window.lang) {
  window.lang = lang;
}
if(!window.locale){
  window.locale=locale
}
// console.log('locale',locale);