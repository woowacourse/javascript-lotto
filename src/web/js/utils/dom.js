export const $ = (selector) => {
  const select = document.querySelector(selector);
  if (select !== null && select !== undefined) return select;
};

export const $$ = (selector) => {
  const select = document.querySelectorAll(selector);
  if (select !== null && select !== undefined) return select;
};
