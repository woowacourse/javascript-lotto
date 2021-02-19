export const $ = (selector) => {
  const $elements = document.querySelectorAll(selector);

  if ($elements.length === 0) return null;
  if ($elements.length === 1) return $elements[0];
  return $elements;
};

export const toDataAttributeSelector = (js_selector) =>
  `[data-js-selector="${js_selector}"]`;
export const toClassSelector = (className) => `.${className}`;
