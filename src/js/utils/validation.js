import { LOTTO_SETTINGS } from './constants/settings.js';

export function isMoneyNotInteger(money) {
  return Math.floor(money) !== money;
}

export function isResultInputsEmpty(numbers) {
  return numbers.some(number => number === 0);
}

export function isNumbersDuplicated(numbers) {
  const set = new Set(numbers);
  return numbers.length !== set.size;
}

export function isNumbersOutOfRange(numbers) {
  return numbers.some(number => (
    number < LOTTO_SETTINGS.MIN_LOTTO_NUMBER ||
    number > LOTTO_SETTINGS.MAX_LOTTO_NUMBER));
} 
