export const $ = (selector) => document.querySelector(selector);
export const toDataAttributeSelector = (js_selector) =>
  `[data-js-selector="${js_selector}"]`;
