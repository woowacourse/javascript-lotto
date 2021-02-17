export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min + 1);

export const getQuotient = (dividend, divisor) =>
  parseInt(dividend / divisor, 10);

export const sortByNumber = (array) => array.slice().sort((a, b) => a - b);

export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);
