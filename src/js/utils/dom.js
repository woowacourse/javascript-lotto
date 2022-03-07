export const $ = (select) => document.querySelector(select);

export const $$ = (select) => document.querySelectorAll(select);

export const setElement = (element, isDisable) => {
  // eslint-disable-next-line no-unused-expressions
  isDisable ? element.setAttribute("disabled", true) : element.removeAttribute("disabled");
};
