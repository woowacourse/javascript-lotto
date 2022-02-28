export const $ = (select) => document.querySelector(select);

export const disableElement = (element) => {
  element.setAttribute("disabled", true);
};

export const enableElement = (element) => {
  element.removeAttribute("disabled");
};
