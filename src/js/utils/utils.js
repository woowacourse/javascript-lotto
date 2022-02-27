export function $(id) {
  return document.getElementById(id);
}

export function generateRandomNumberRange(MINIMUM, MAXIMUM) {
  return Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1) + MINIMUM);
}
