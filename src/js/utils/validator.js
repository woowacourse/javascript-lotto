export const isPositiveInteger = (value) => /^[0-9]*$/g.test(value) && value > 0;

export const isDivisible = (value, number) => value % number === 0;
