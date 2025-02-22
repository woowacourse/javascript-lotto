import { lottoNumberValidator } from '../validator/lottoNumberValidator.js';
import { LOTTO_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';
import { numberUtils } from '../utils/numberUtils.js';

const validateLottoCount = (numbers) => {
  if (lottoNumberValidator.isValidCount(numbers)) {
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.COUNT);
  }
};

const validateLottoNumberInteger = (numbers) => {
  numbers.forEach((numbers) => {
    if (!numberUtils.isInteger(numbers)) throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER);
  });
};

const validateLottoNumberRange = (numbers) => {
  numbers.forEach((number) => {
    if (!numberUtils.isLottoRange(number)) throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.RANGE);
  });
};

const validateLottoNumberDuplicate = (numbers) => {
  if (lottoNumberValidator.isDuplicated(numbers)) {
    throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE);
  }
};

const validateLottoNumber = (lottoNumbers) =>
  runValidators(
    [validateLottoCount, validateLottoNumberInteger, validateLottoNumberRange, validateLottoNumberDuplicate],
    lottoNumbers,
  );

export default validateLottoNumber;
