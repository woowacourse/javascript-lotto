export const $ = selector => document.querySelector(selector);
export const $$ = selector => Array.from(document.querySelectorAll(selector));

export const clearInput = $input => {
  $input.value = '';
};
