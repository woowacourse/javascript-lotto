import { LOTTO } from '../constants/constants';

export function isInRange(arr, min, max) {
  return arr.every((item) => item >= min && item <= max);
}

export function isDuplicated(arr) {
  const set = new Set(arr);
  return set.size !== arr.length;
}

function isOverRange(arr, min, max) {
  return arr.some((item) => item < min || item > max);
}

export function validateArrayNumber(arr) {
  if (isDuplicated(arr)) {
    throw new Error('중복된 숫자를 입력하면 안됩니다.');
  }
  if (isOverRange(arr, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)) {
    throw new Error(
      `${LOTTO.MIN_NUMBER}와 ${LOTTO.MAX_NUMBER}사이로 입력해주세요`
    );
  }
}
