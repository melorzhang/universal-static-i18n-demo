import './index.less';
// const config = require('../../bundle.config');
// console.log(config);
const lang=window.lang||'zh-CN';
console.log(lang);
const rootEle = document.querySelector('.data');
if (rootEle) {
  const locale = window.locale || {};
  rootEle.innerHTML = `<div><div class='m-title'>${locale.hello},${locale.author}</div>
  <div  class='m-main'>${locale.hello}</div></div>`;
}