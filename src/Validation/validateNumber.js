import ERROR_MESSAGE from '../settings/ErrorMessage.js';

export default function validateNumber(input) {
  return isPositive(isInteger(isNumber(input)));
}
export function isNumber(input) {
  if (Number.isNaN(Number(input))) throw new Error(ERROR_MESSAGE.notANumber);
  return Number(input);
}

export function isInteger(input) {
  if (!Number.isInteger(input)) throw new Error(ERROR_MESSAGE.notInteger);
  return input;
}

export function isPositive(input) {
  if (input <= 0) throw new Error(ERROR_MESSAGE.notPositive);
  return input;
}
