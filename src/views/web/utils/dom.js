const getById = (id) => document.getElementById(id);
const getByClass = (className) => document.getElementsByClassName(className);
const getByTag = (tagName) => document.getElementsByTagName(tagName);
const querySelector = (selector) => document.querySelector(selector);
const createTag = (tagName) => document.createElement(tagName);

const showElement = ($target) => $target.classList.remove('hidden');
const hideElement = ($target) => $target.classList.add('hidden');

const disableElement = (id) => {
  getById(id).disabled = true;
};
const enableElement = (id) => {
  getById(id).disabled = false;
};

const createContainer = (tag, { padding, margin }) => {
  const $container = createTag(tag);

  if (padding) $container.style.padding = padding;
  if (margin) $container.style.margin = margin;

  return $container;
};

export {
  getById,
  getByClass,
  getByTag,
  querySelector,
  createTag,
  showElement,
  hideElement,
  disableElement,
  enableElement,
  createContainer,
};
