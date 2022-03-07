export const $ = (selector, parent) => (parent ?? document).querySelector(selector);
export const $$ = (selector, parent) => (parent ?? document).querySelectorAll(selector);
