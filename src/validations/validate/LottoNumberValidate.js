import { LottoNumberValidator } from '../validator/LottoNumberValidator.js';
import { LOTTO_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';
import { setErrorMessage } from '../../utils/domErrorMsg.js';

const validateLottoCount = (numbers) => {
  if (LottoNumberValidator.isValidCount(numbers)) {
    setErrorMessage(LOTTO_NUMBER_ERROR_MESSAGES.COUNT, 'lotto-form__error');
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.COUNT);
  }
};

const validateLottoNumberInteger = (numbers) => {
  numbers.forEach((numbers) => {
    if (!LottoNumberValidator.isInteger(numbers)) {
      setErrorMessage(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER, 'lotto-form__error');
      throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER);
    }
  });
};

const validateLottoNumberRange = (numbers) => {
  numbers.forEach((number) => {
    if (!LottoNumberValidator.isValidRange(number)) {
      setErrorMessage(LOTTO_NUMBER_ERROR_MESSAGES.RANGE, 'lotto-form__error');
      throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.RANGE);
    }
  });
};

const validateLottoNumberDuplicate = (numbers) => {
  if (LottoNumberValidator.isDuplicated(numbers)) {
    setErrorMessage(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE, 'lotto-form__error');
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE);
  }
};

const validateLottoNumber = (lottoNumbers) =>
  runValidators(
    [validateLottoCount, validateLottoNumberInteger, validateLottoNumberRange, validateLottoNumberDuplicate],
    lottoNumbers,
  );

export default validateLottoNumber;
