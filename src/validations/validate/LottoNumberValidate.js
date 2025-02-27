import { LottoNumberValidator } from '../validator/LottoNumberValidator.js';
import { LOTTO_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';

const $lottoFormError = document.getElementById('lotto-form__error');

const validateLottoCount = (numbers) => {
  if (LottoNumberValidator.isValidCount(numbers)) {
    $lottoFormError.textContent = LOTTO_NUMBER_ERROR_MESSAGES.COUNT;
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.COUNT);
  }
};

const validateLottoNumberInteger = (numbers) => {
  numbers.forEach((numbers) => {
    if (!LottoNumberValidator.isInteger(numbers)) {
      $lottoFormError.textContent = LOTTO_NUMBER_ERROR_MESSAGES.INTIGER;
      throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER);
    }
  });
};

const validateLottoNumberRange = (numbers) => {
  numbers.forEach((number) => {
    if (!LottoNumberValidator.isValidRange(number)) {
      $lottoFormError.textContent = LOTTO_NUMBER_ERROR_MESSAGES.RANGE;
      throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.RANGE);
    }
  });
};

const validateLottoNumberDuplicate = (numbers) => {
  if (LottoNumberValidator.isDuplicated(numbers)) {
    $lottoFormError.textContent = LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE;
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE);
  }
};

const validateLottoNumber = (lottoNumbers) =>
  runValidators(
    [validateLottoCount, validateLottoNumberInteger, validateLottoNumberRange, validateLottoNumberDuplicate],
    lottoNumbers,
  );

export default validateLottoNumber;
