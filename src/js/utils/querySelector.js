export const $ = (selector, { $parent } = { $parent: document }) => {
  return $parent.querySelector(selector);
};

export const $$ = (selector, { $parent } = { $parent: document }) => {
  return $parent.querySelectorAll(selector);
};

export const toDataAttributeSelector = (js_selector) =>
  `[data-js-selector="${js_selector}"]`;

export const toClassSelector = (className) => `.${className}`;
