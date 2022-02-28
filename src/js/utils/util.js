export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const generateIntegerArray = (end, start = 1) => {
  const emptyArray = [];
  emptyArray.length = end - start + 1;
  emptyArray.fill(null);
  return emptyArray.map((_, index) => index + start);
}

export const divider = (dividend, divisor) => ({
  quotient: Math.floor(dividend / divisor), 
  remainder: dividend % divisor
})
