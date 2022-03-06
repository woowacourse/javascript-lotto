export const getElement = (selector) => document.querySelector(selector);

export const getElements = (selector) => document.querySelectorAll(selector);

export const toggleElement = (element, className) => {
  element.classList.toggle(className);
};

export const disableElement = (element) => {
  element.disabled = !element.disabled;
};

export const removeChildElements = (parentElement, childElements) => {
  childElements.forEach((childElement) => {
    parentElement.removeChild(childElement);
  });
};

export const enabledElements = (elements, className) => {
  elements.forEach((element) => {
    toggleElement(element, className);
    disableElement(element);
  });
};

export const disabledElements = (elements, className) => {
  elements.forEach((element) => {
    toggleElement(element, className);
    disableElement(element);
  });
};

export const focusInput = (element) => element.focus();

export const initInput = (inputElement) => {
  inputElement.value = '';
  inputElement.focus();
};

export const alertMessage = (message) => alert(message);

export const render = (element, template) => {
  element.insertAdjacentHTML('beforeend', template);
};

export const bindEventListener = (selector, type, callback) => {
  selector.addEventListener(type, callback);
};

export const bindsEventListener = (parentElement, type, callback) => {
  parentElement.addEventListener(type, callback);
};
