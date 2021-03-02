import { LOTTO_SETTINGS } from './constants/settings.js';

export function isNumbersDuplicated(numbers) {
  const set = new Set(numbers);
  return numbers.length !== set.size;
}

export function isSomeNumberOutOfRange(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > LOTTO_SETTINGS.MAX_LOTTO_NUMBER || numbers[i] < LOTTO_SETTINGS.MIN_LOTTO_NUMBER) {
      return true;
    }
  }
  return false;
}
