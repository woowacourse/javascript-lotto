export const selectDom = (selector, parent = document) => parent.querySelector(selector);
export const isNumberInRange = ({ number, min, max }) => number >= min && number <= max;
export const generateRandomNumberInRange = (min, max) =>
  Math.floor(Math.random() * (max - min) + min); // eslint-disable-line
