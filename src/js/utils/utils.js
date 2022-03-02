export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function generateRandomNumberRange(MINIMUM, MAXIMUM) {
  return Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1) + MINIMUM);
}

export function isInRange(arr, minimum, maximum) {
  return arr.every((item) => item >= minimum && item <= maximum);
}

export function isDuplicated(arr) {
  const set = new Set(arr);
  return set.size === arr.length;
}
