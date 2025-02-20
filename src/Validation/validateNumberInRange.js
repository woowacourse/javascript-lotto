import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import systemSettings from '../settings/systemSettings.js';
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
