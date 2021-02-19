export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const clearInputValue = ($target) => ($target.value = '');
