const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const makeNode = (tag) => document.createElement(tag);

export { $, $$, makeNode };
