import ERROR_MESSAGE from '../settings/ErrorMessage.js';

export default function isNumber(input) {
  if (Number.isNaN(Number(input))) {
    throw new Error(ERROR_MESSAGE.notANumber);
  }
  return Number(input);
}
