export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const open = ($target) => $target.classList.add('open');
export const close = ($target) => $target.classList.remove('open');

export const $error = $('.error');
