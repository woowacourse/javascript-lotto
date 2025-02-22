import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import systemSettings from '../constants/systemSettings.js';

export default function validateNumberInRange(numbers) {
  if (
    numbers.some(
      (number) =>
        number < systemSettings.minLottoNumber ||
        number > systemSettings.maxLottoNumber,
    )
  )
    throw new Error(ERROR_MESSAGE.numberOutOfRange);
}
