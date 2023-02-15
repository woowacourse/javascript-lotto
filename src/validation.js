const isInteger = (value) => Number.isInteger(value);
const isPositiveNumber = (number) => number > 0;

export const isPositiveInteger = (value) => isInteger(value) && isPositiveNumber(value);

export const isValidLottoNumber = (number) => {
  const MIN_NUMBER = 1;
  const MAX_NUMBER = 45;

  return number >= MIN_NUMBER && number <= MAX_NUMBER;
};

export const isValidRestartCommand = (command) => command === 'y' || command === 'n';
