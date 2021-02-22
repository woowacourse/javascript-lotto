export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const clearInput = $input => {
  $input.value = '';
};
