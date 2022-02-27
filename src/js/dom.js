const getElement = (selector) => document.querySelector(selector);

const getElements = (selector) => document.querySelectorAll(selector);

const alertMessage = (message) => alert(message);

const toggleClassName = (element, domString) => {
  element.classList.toggle(domString);
};

const disableElement = (element) => {
  element.disabled = !element.disabled;
};

const initInput = (inputElement) => {
  inputElement.value = '';
  inputElement.focus();
};

const render = (element, template) => {
  element.insertAdjacentHTML('beforeend', template);
};

const bindEventListener = ({ appElement, type, selector, callback }) => {
  const children = [...getElements(selector)];
  const isTarget = (target) =>
    children.includes(target) || target.closest(selector);

  appElement.addEventListener(type, (e) => {
    if (!isTarget(e.target)) return;

    e.preventDefault();
    callback(e);
  });
};

export {
  getElement,
  getElements,
  alertMessage,
  bindEventListener,
  render,
  initInput,
  disableElement,
  toggleClassName,
};
