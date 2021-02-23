export function $(selector) {
  return document.querySelector(selector);
};

export function $$(selector) {
  return document.querySelectorAll(selector);
};

export function disableElement(selector) {
  $(selector).disabled = true;
} 