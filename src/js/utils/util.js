export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const generateRandomInRange = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

export const divider = (dividend, divisor) => ({
  quotient: Math.floor(dividend / divisor),
  remainder: dividend % divisor,
});

export const matchNumber = (numberArray1, numberArray2) => {
  return numberArray1.filter(number => numberArray2.includes(number)).length;
};
