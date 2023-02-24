export const $ = (query) => document.querySelector(query);
export const all$ = (query) => document.querySelectorAll(query);
const setDomAttributes = ($element) => (options) => {
  Object.assign($element, options);
  return $element;
};
export const createDomWith = (tag) => (options) =>
  setDomAttributes(document.createElement(tag))(options);
export const appendDomByList = ($parent) => (children) => (handler) => {
  $parent.append(...children.map(handler));
};
