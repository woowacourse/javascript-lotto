export const isNumber = (value) => /^[0-9]*$/g.test(value);

export const isPositiveInteger = (value) => isNumber(value) && value > 0;

export const isDivisible = (value, number) => value % number === 0;
