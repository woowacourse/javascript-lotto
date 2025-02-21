import ERROR_MESSAGE from '../settings/ErrorMessage.js';

export default function validateNumber(input) {
  return _isPositive(_isInteger(_isNumber(input)));
}
export function _isNumber(input) {
  if (Number.isNaN(Number(input))) throw new Error(ERROR_MESSAGE.notANumber);
  return Number(input);
}

export function _isInteger(input) {
  if (!Number.isInteger(input)) throw new Error(ERROR_MESSAGE.notInteger);
  return input;
}

export function _isPositive(input) {
  if (input <= 0) throw new Error(ERROR_MESSAGE.notPositive);
  return input;
}
