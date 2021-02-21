const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => Array.from(document.querySelectorAll(selector));

export { $, $$ };
