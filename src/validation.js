import {
  LOTTO_NUMBER_RANGE_MIN,
  LOTTO_NUMBER_RANGE_MAX,
  LOTTO_NUMBER_SIZE,
} from './util/constants';

const isInteger = (value) => Number.isInteger(value);
const isPositiveNumber = (number) => number > 0;
const isValidLottoNumberRange = (number) => {
  return number >= LOTTO_NUMBER_RANGE_MIN && number <= LOTTO_NUMBER_RANGE_MAX;
};

export const isPositiveInteger = (value) => isInteger(value) && isPositiveNumber(value);

export const isValidRestartCommand = (command) => command === 'y' || command === 'n';

export const isValidLottoNumber = (number) => {
  return isPositiveInteger(number) && isValidLottoNumberRange(number);
};

export const isDuplicateNumbers = (numbers) => {
  return new Set(numbers).size !== LOTTO_NUMBER_SIZE || numbers.length !== LOTTO_NUMBER_SIZE;
};

export const isValidLottoNumbers = (numbers) => {
  return numbers.every(isValidLottoNumber);
};
