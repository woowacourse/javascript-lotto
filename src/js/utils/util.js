export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const generateRandomInRange = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

export const divider = (dividend, divisor) => ({
  quotient: Math.floor(dividend / divisor),
  remainder: dividend % divisor,
});

export const matchNumber = (numberArray1, numberArray2) => {
  let count = 0;
  numberArray1.forEach(number1 => {
    numberArray2.forEach(number2 => (count += number1 === number2));
  });
  return count;
};
