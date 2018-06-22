const lang = "zh-CN";
if (!window.lang) {
  window.lang = lang;
}
const locale = require('../locale/zh-CN.js');
// console.log('locale', locale);
if (!window.locale) {
  window.locale = locale
}