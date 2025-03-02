export const hideElement = (el) => {
  el.classList.add("hidden");
};

export const renderElement = (el) => {
  el.classList.remove("hidden");
};

export const $ = (selector, target = document) => {
  return target.querySelector(selector);
};

export const $$ = (selector, target = document) => {
  return target.querySelectorAll(selector);
};
