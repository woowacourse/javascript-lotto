export const getElement = (selector) => document.querySelector(selector);

export const getElements = (selector) => document.querySelectorAll(selector);

export const alertMessage = (message) => alert(message);

export const toggleClassName = (element, domString) => {
  element.classList.toggle(domString);
};

export const disableElement = (element) => {
  element.disabled = !element.disabled;
};

export const initInput = (inputElement) => {
  inputElement.value = '';
  inputElement.focus();
};

export const render = (element, template) => {
  element.insertAdjacentHTML('beforeend', template);
};

export const bindEventListener = ({ appElement, type, selector, callback }) => {
  const children = [...getElements(selector)];
  const isTarget = (target) =>
    children.includes(target) || target.closest(selector);

  appElement.addEventListener(type, (e) => {
    if (!isTarget(e.target)) return;

    e.preventDefault();
    callback(e);
  });
};
