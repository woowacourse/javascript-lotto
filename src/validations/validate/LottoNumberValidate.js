import { LottoNumberValidator } from '../validator/LottoNumberValidator.js';
import { LOTTO_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';

const validateLottoCount = (numbers) => {
  if (LottoNumberValidator.isValidCount(numbers)) {
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.COUNT);
  }
};

const validateLottoNumberInteger = (numbers) => {
  numbers.forEach((numbers) => {
    if (!LottoNumberValidator.isInteger(numbers)) throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER);
  });
};

const validateLottoNumberRange = (numbers) => {
  numbers.forEach((number) => {
    if (!LottoNumberValidator.isValidRange(number)) throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.RANGE);
  });
};

const validateLottoNumberDuplicate = (numbers) => {
  if (LottoNumberValidator.isDuplicated(numbers)) {
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE);
  }
};

const validateLottoNumber = (lottoNumbers) =>
  runValidators(
    [validateLottoCount, validateLottoNumberInteger, validateLottoNumberRange, validateLottoNumberDuplicate],
    lottoNumbers,
  );

export default validateLottoNumber;
