export const $ = selector => document.querySelector(selector);

export const clearInput = $input => {
  $input.value = '';
};
