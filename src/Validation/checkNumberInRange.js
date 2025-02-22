import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import {
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../constants/MagicNumber.js';

export default function checkNumberInRange(numbers) {
  if (
    numbers.some(
      (number) => number < MIN_LOTTO_NUMBER || number > MAX_LOTTO_NUMBER,
    )
  )
    throw new Error(ERROR_MESSAGE.numberOutOfRange);

  return numbers;
}
