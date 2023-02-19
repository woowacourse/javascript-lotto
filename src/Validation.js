import Messages from './constant/Messages';
import RestartCommand from './constant/RestartCommand';
import LottoError from './errors/LottoError';

const Validation = {
  REGEX_NUMERIC: /^\d+$/,

  isNumeric(text) {
    return Validation.REGEX_NUMERIC.test(text);
  },

  validateMoney(money) {
    if (!Validation.isNumeric(money) || money < 0) {
      throw new LottoError(Messages.ERROR_MONEY_SHOULD_POSITIVE_INTEGER);
    }
    if (money % 1000 !== 0 || money / 1000 <= 0) {
      throw new LottoError(Messages.ERROR_MONEY_AMOUNT_SHOULD_MULTIPLE_OF);
    }
  },

  validateLottoNumber(lottoNumber) {
    if (!Validation.isNumeric(lottoNumber)) {
      throw new Error(Messages.ERROR_LOTTO_NUMBER_SHOULD_NUMERIC);
    }
    if (lottoNumber < 1 || 45 < lottoNumber) {
      throw new Error(Messages.ERROR_LOTTO_NUMBER_SHOULD_BETWEEN);
    }
  },

  validateLottoNumbers(lottoNumbers) {
    Validation.validateIsArray(lottoNumbers);
    Validation.validateArrayLength(lottoNumbers);
    Validation.validateUniqueNumbers(lottoNumbers);

    lottoNumbers.forEach(Validation.validateLottoNumber);
  },

  validateIsArray(lottoNumbers) {
    if (!Array.isArray(lottoNumbers)) {
      throw new Error(Messages.ERROR_LOTTO_NUMBERS_SHOULD_ARRAY);
    }
  },

  validateArrayLength(lottoNumbers) {
    if (lottoNumbers.length !== 6) {
      throw new Error(Messages.ERROR_LOTTO_NUMBERS_SHOULD_LENGTH_OF);
    }
  },

  validateUniqueNumbers(lottoNumbers) {
    const lottoSet = new Set(lottoNumbers);
    if (lottoNumbers.length !== lottoSet.size) {
      throw new Error(Messages.ERROR_LOTTO_NUMBERS_SHOULD_UNIQUE);
    }
  },

  validateBonusNumberDistinct(lottoNumbers, bonusNumber) {
    if (lottoNumbers.includes(bonusNumber)) {
      throw new Error(Messages.ERROR_BONUS_NUMBER_SHOULD_UNIQUE);
    }
  },

  validateRestartCommand(command) {
    if (!Object.values(RestartCommand).includes(command)) {
      throw new Error(Messages.ERROR_RESTART_COMMAND_SHOULD_BE);
    }
  },
};

export default Validation;
