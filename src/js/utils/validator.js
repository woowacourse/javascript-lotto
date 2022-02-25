export const isPositiveInteger = (value) => /^[0-9]*$/g.test(value) && value > 0;

export const isDivisible = (value, number) => value % number === 0;

export const isValidRangeNumber = (min, max, number) => number >= min && number <= max;

export const isAlreadyExistNumber = (list, number) => list.includes(number);
