export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => [...document.querySelectorAll(selector)];

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
