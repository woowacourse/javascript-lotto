export const $ = (selector, target = document) => target.getElementById(`${selector}`);
export const $$ = (selector, target = document) => target.querySelectorAll(`.${selector}`);

export const replaceHTML = (element, template) => {
  element.replaceChildren();
  element.insertAdjacentHTML('beforeend', template);
};

export const addClassName = ($element, className) => {
  $element.classList.add(className);
};

export const removeClassName = ($element, className) => {
  $element.classList.remove(className);
};
