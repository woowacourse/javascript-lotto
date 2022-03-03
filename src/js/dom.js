export const getElement = (selector) => document.querySelector(selector);

export const getElements = (selector) => document.querySelectorAll(selector);

export const alertMessage = (message) => alert(message);

export const removeChildElement = (parentElement, childElement) =>
  parentElement.removeChild(childElement);

export const toggleClassName = (element, domString) => {
  element.classList.toggle(domString);
};

export const disableElement = (element) => {
  element.disabled = !element.disabled;
};

export const focusInput = (element) => element.focus();

export const initInput = (inputElement) => {
  inputElement.value = '';
  inputElement.focus();
};

export const render = (element, template) => {
  element.insertAdjacentHTML('beforeend', template);
};

export const bindEventListener = (selector, type, callback) => {
  selector.addEventListener(type, callback);
};

export const bindsEventListener = (parentElement, type, callback) => {
  parentElement.addEventListener(type, callback);
};
