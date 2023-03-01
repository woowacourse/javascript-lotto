export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const enableElements = (...elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

export const disableElements = (...elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};
