import { ERROR, COMMAND, LOTTO_NUMBER, ERROR_METHOD } from '../utils/constants.js';

const Validator = {
  validateLottoNumberLength(lottoNumber) {
    if (lottoNumber.length !== LOTTO_NUMBER.LENGTH) throw new Error(ERROR.LOTTO_NUMBER_LENGTH);
  },

  validateLottoNumberDuplicated(lottoNumber) {
    if (lottoNumber.length !== new Set(lottoNumber).size)
      throw new Error(ERROR.LOTTO_NUMBER_DUPLICATED);
  },

  validateLottoNumberRange(lottoNumber) {
    const isExistInvalidRange = lottoNumber.some(
      (number) => number < LOTTO_NUMBER.MIN || number > LOTTO_NUMBER.MAX
    );
    if (isExistInvalidRange) {
      throw new Error(ERROR.LOTTO_NUMBER_RANGE);
    }
  },

  validateBonusNumberDuplicated(lottoNumber, bonusNumber) {
    if (lottoNumber.includes(Number(bonusNumber))) throw new Error(ERROR.BONUS_NUMBER_DUPLICATED);
  },

  validateBonusNumberRange(bonusNumber) {
    if (bonusNumber < LOTTO_NUMBER.MIN || bonusNumber > LOTTO_NUMBER.MAX)
      throw new Error(ERROR.BONUS_NUMBER_RANGE);
  },

  validateIsEmpty(input) {
    if (input === '' || input === 0) throw new Error(ERROR.IS_EMPTY);
  },

  validateNumberType(input) {
    if (Number.isNaN(Number(input))) throw new Error(ERROR.NUMBER_TYPE);
  },

  validateExactUnit(input, unit) {
    if (input % unit !== 0) throw new Error(ERROR_METHOD.EXACT_UNIT(unit));
  },

  validateRetryCommand(command) {
    if (command !== COMMAND.RETRY && command !== COMMAND.CLOSE)
      throw new Error(ERROR.RETRY_COMMAND);
  },
};

export default Validator;
