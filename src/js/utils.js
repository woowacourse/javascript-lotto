export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => [...document.querySelectorAll(selector)];

export const createElement = (tagName, className, text) => {
  const $element = document.createElement(tagName);
  $element.className = className;
  $element.append(text);
  return $element;
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
