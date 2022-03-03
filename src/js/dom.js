export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const toggleClassName = (element, classname) => {
  element.classList.toggle(classname);
};

export const toggleDisabled = (element) => {
  element.disabled = !element.disabled;
};

export const initInput = (inputElement) => {
  inputElement.value = '';
  inputElement.focus();
};

export const render = (element, template) => {
  element.insertAdjacentHTML('beforeend', template);
};

export const bindClick = (appElement, selector, callback) => {
  const children = [...$$(selector)];
  const isTarget = (target) =>
    children.includes(target) || target.closest(selector);

  appElement.addEventListener('click', (e) => {
    if (!isTarget(e.target)) return;

    e.preventDefault();
    callback(e);
  });
};
