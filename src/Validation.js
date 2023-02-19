import {
  ERROR,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  MONEY_UNIT,
  RESTART_COMMAND,
  END_COMMAND,
  LOTTO_DIGITS,
} from './constants';

const Validation = {
  REGEX_NUMERIC: /^\d+$/,

  isNumeric(number) {
    return Validation.REGEX_NUMERIC.test(number);
  },

  isLottoNumbersInRange(number) {
    return number >= MIN_LOTTO_NUMBER && number <= MAX_LOTTO_NUMBER;
  },

  validateMoney(money) {
    if (!Validation.isNumeric(money) || money < 0) {
      throw new Error(ERROR.MONEY_NOT_A_INTEGER);
    }
    if (money % MONEY_UNIT !== 0 || money / MONEY_UNIT <= 0) {
      throw new Error(ERROR.INVALID_MONEY_UNIT);
    }
  },

  validateLottoNumber(lottoNumber) {
    if (!Validation.isNumeric(lottoNumber)) {
      throw new Error(ERROR.LOTTO_NOT_A_NUMBER);
    }
    if (!Validation.isLottoNumbersInRange(lottoNumber)) {
      throw new Error(ERROR.INVALID_LOTTO_RANGE);
    }
  },

  validateLottoNumbers(lottoNumbers) {
    Validation.validateIsArray(lottoNumbers);
    Validation.validateArrayLength(lottoNumbers);
    Validation.validateDistinctNumbers(lottoNumbers);

    lottoNumbers.forEach(Validation.validateLottoNumber);
  },

  validateIsArray(lottoNumbers) {
    if (!Array.isArray(lottoNumbers)) {
      throw new Error(ERROR.LOTTO_NOT_AN_ARRAY);
    }
  },

  validateArrayLength(lottoNumbers) {
    if (lottoNumbers.length !== LOTTO_DIGITS) {
      throw new Error(ERROR.INVALID_LOTTO_DIGITS);
    }
  },

  validateDistinctNumbers(lottoNumbers) {
    const lottoSet = new Set(lottoNumbers);
    if (lottoNumbers.length !== lottoSet.size) {
      throw new Error(ERROR.LOTTO_NUMBERS_DUPLICATED);
    }
  },

  validateBonusNumberDistinct(lottoNumbers, bonusNumber) {
    if (lottoNumbers.includes(bonusNumber)) {
      throw new Error(ERROR.LOTTO_BONUS_DUPLICATED);
    }
  },

  validateRestartCommand(command) {
    const commands = [RESTART_COMMAND, END_COMMAND];
    if (!commands.includes(command)) {
      throw new Error(ERROR.INVALID_COMMAND);
    }
  },
};

export default Validation;
