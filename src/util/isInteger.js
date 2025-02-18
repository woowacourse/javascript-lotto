import ERROR_MESSAGE from '../settings/ErrorMessage.js';

export default function isInteger(input) {
  if (!Number.isInteger(Number(input)))
    throw new Error(ERROR_MESSAGE.notInteger);
  return Number(input);
}
