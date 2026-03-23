export function $(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
}

export function $All(selector) {
  return document.querySelectorAll(selector);
}
