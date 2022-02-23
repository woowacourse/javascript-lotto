export const selectDom = (selector, parent = document) => parent.querySelector(selector);
export const isNumberInRange = ({ number, min, max }) => number >= min && number <= max;
export const generateRandomNumberInRange = (min, max) =>
  Math.floor(Math.random() * (max - min) + min); // eslint-disable-line
export const createElementWithClassName = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};
