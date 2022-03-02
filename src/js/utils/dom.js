export const $ = (selector, target = document) => target.querySelector(selector);

export const $$ = (selector, target = document) => target.querySelectorAll(selector);

const removeChildren = parent => {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
};
export const replaceHTML = (element, template) => {
  removeChildren(element);
  element.insertAdjacentHTML('beforeend', template);
};

export const clearInputValue = input => (input.value = '');

export const enableElement = element => (element.disabled = false);
export const disableElement = element => (element.disabled = true);
