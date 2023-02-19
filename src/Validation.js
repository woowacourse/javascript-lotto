import Messages from './constant/Messages';
import RestartCommand from './constant/RestartCommand';
import Lotto from './domain/lotto/Lotto';
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
    if (money % Lotto.PRICE !== 0 || money / Lotto.PRICE <= 0) {
      throw new LottoError(Messages.ERROR_MONEY_AMOUNT_SHOULD_MULTIPLE_OF, Lotto.PRICE);
    }
  },

  validateLottoNumber(lottoNumber) {
    if (!Validation.isNumeric(lottoNumber)) {
      throw new LottoError(Messages.ERROR_LOTTO_NUMBER_SHOULD_NUMERIC);
    }
    if (lottoNumber < Lotto.NUMBER_LOWER_BOUND || Lotto.NUMBER_UPPER_BOUND < lottoNumber) {
      throw new LottoError(
        Messages.ERROR_LOTTO_NUMBER_SHOULD_BETWEEN,
        Lotto.NUMBER_LOWER_BOUND,
        Lotto.NUMBER_UPPER_BOUND,
      );
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
      throw new LottoError(Messages.ERROR_LOTTO_NUMBERS_SHOULD_ARRAY);
    }
  },

  validateArrayLength(lottoNumbers) {
    if (lottoNumbers.length !== Lotto.LENGTH) {
      throw new LottoError(Messages.ERROR_LOTTO_NUMBERS_SHOULD_LENGTH_OF, Lotto.LENGTH);
    }
  },

  validateUniqueNumbers(lottoNumbers) {
    const lottoSet = new Set(lottoNumbers);
    if (lottoNumbers.length !== lottoSet.size) {
      throw new LottoError(Messages.ERROR_LOTTO_NUMBERS_SHOULD_UNIQUE);
    }
  },

  validateBonusNumberDistinct(lottoNumbers, bonusNumber) {
    if (lottoNumbers.includes(bonusNumber)) {
      throw new LottoError(Messages.ERROR_BONUS_NUMBER_SHOULD_UNIQUE);
    }
  },

  validateRestartCommand(command) {
    if (!Object.values(RestartCommand).includes(command)) {
      throw new LottoError(Messages.ERROR_RESTART_COMMAND_SHOULD_BE);
    }
  },
};

export default Validation;
