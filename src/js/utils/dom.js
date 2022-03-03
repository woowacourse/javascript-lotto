export const $ = (selector, target = document) => target.getElementById(`${selector}`);
export const $$ = (selector, target = document) => target.querySelectorAll(`.${selector}`);

export const replaceHTML = (element, template) => {
  element.replaceChildren();
  element.insertAdjacentHTML('beforeend', template);
};
