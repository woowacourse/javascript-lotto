export const $ = (selector, target = document) => {
  const element = target.querySelector(selector);

  if (!element) {
    throw new Error('Element is not found');
  }

  return element;
};
export const $$ = (selector, target = document) => {
  const elements = target.querySelectorAll(selector);

  if (elements.length === 0) {
    throw new Error('Elements are not found');
  }

  return elements;
};

export const makeNode = (tag) => document.createElement(tag);
