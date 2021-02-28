export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const clearInputValue = ($target) => ($target.value = '');

export const show = ($target) => $target.classList.remove('d-none');
export const hide = ($target) => $target.classList.add('d-none');

export const disable = ($target) => ($target.disabled = true);
export const enable = ($target) => ($target.disabled = false);

export const select = ($target) => $target.classList.add('selected');
export const unselect = ($target) => $target.classList.remove('selected');
