import { wrap } from "./proxy.js";

export const $ = (selector, { $parent } = { $parent: document }) => {
  return wrap($parent.querySelector(selector));
};

export const $$ = (selector, { $parent } = { $parent: document }) => {
  return [...$parent.querySelectorAll(selector)].map(($element) => {
    return wrap($element);
  });
};

export const toDataAttributeSelector = (js_selector) => {
  return `[data-js-selector="${js_selector}"]`;
};

export const toClassSelector = (className) => `.${className}`;
