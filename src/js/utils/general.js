export const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export const isValidMinimumAmount = (amount, min) => {
  return amount < min;
};

export const isValidAmountUnit = (amount, unit) => {
  return amount % unit !== 0;
};

export const isValidTypeNumber = (number) => {
  // eslint-disable-next-line no-restricted-globals
  return isNaN(number);
};

export const isValidEmptyValue = (number) => {
  return number === 0;
};

export const isValidOverlap = (numbers) => {
  return numbers.length !== [...new Set(numbers)].length;
};

export const isValidNumberRange = (number, min, max) => {
  return number < min || number > max;
};
