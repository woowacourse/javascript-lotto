import ERROR_MESSAGE from '../settings/ErrorMessage.js';
export default function checkNumberInRange(numbers) {
  if (numbers.some((number) => number < 1 || number > 45))
    throw new Error(ERROR_MESSAGE.numberOutOfRange);
}
