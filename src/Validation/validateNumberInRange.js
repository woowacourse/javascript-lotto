import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import { lottoGameSettings } from '../settings/systemSettings.js';

export default function validateNumberInRange(numbers) {
  if (
    numbers.some(
      (number) =>
        number < lottoGameSettings.minLottoNumber ||
        number > lottoGameSettings.maxLottoNumber,
    )
  )
    throw new Error(ERROR_MESSAGE.numberOutOfRange);
}
