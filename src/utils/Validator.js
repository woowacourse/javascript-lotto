import { ERROR_MESSAGE, SETTINGS } from "../constants/Config.js";

const Validator = {
  isNumber(input) {
    if (isNaN(input)) throw new Error(ERROR_MESSAGE.NUMBER_TYPE);
  },

  isDividedByThousand(buyMoney) {
    if (buyMoney % 1000 !== 0) throw new Error(ERROR_MESSAGE.MONEY_UNIT);
  },

  isPositiveInteger(input) {
    if (input < 0 || input % 1 !== 0)
      throw new Error(ERROR_MESSAGE.POSITIVE_INTEGER);
  },

  isCorrectRange(input) {
    const lottoNumberRange = 0 < input && input < 46;
    if (!lottoNumberRange) throw new Error(ERROR_MESSAGE.CORRECT_NUMBER_RANGE);
  },

  isDuplicatedNumber(winningLotto) {
    const duplicatedNumber = [...new Set(winningLotto)];
    if (winningLotto.length !== duplicatedNumber.length)
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
  },

  isCorrectLength(winningLotto) {
    if (winningLotto.length !== SETTINGS.MAX_WINNING_NUMBER_LENGTH)
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_LENGTH);
  },

  hasBonusNumber(bonusNumber, winningLotto) {
    if (winningLotto.includes(bonusNumber))
      throw new Error(ERROR_MESSAGE.HAS_BONUS_NUMBER);
  },

  isCorrectRetryInput(retryInput) {
    if (retryInput !== "y" && retryInput !== "n")
      throw new Error(ERROR_MESSAGE.CORRECT_RETRY_INPUT);
  },
};

export default Validator;
