import ERROR_MESSAGE from '../settings/ErrorMessage.js';

export default function isPositive(input) {
  if (Number(input) <= 0) throw new Error(ERROR_MESSAGE.notPositive);
  return Number(input);
}
