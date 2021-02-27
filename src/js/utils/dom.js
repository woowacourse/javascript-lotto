const documentCache = document;

export const $ = (selector, target) => {
  if (target) return target.querySelector(selector);
  return documentCache.querySelector(selector);
};
export const $$ = (selector, target) => {
  if (target) return Array.from(target.querySelectorAll(selector));
  return Array.from(documentCache.querySelectorAll(selector));
};

export const clearInputValue = $input => {
  $input.value = '';
};
