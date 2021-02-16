export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min + 1);
};

export const $ = selector => {
  return document.querySelector(selector);
};

export const $$ = selector => {
  return document.querySelectorAll(selector);
};
