import Validator from '../util/Validator.js';
import MESSAGE from '../constant/messages.js';
import { LOTTO_RULE, COMMANDS } from '../constant/constants.js';

const LottoGameValidator = {
  validateMoney(money) {
    if (!Validator.isPositiveInteger(money)) throw new Error(MESSAGE.errorPositiveInteger);

    if (!Validator.isNumberInRange(1000, Number.MAX_SAFE_INTEGER)(money)) {
      throw new Error(MESSAGE.errorMoneyRange);
    }
  },

  validateWinningNumbers(winningNumbers) {
    if (winningNumbers.includes('')) {
      throw new Error(MESSAGE.errorContent);
    }

    if (!winningNumbers.every(Validator.isPositiveInteger)) {
      throw new Error(MESSAGE.errorPositiveInteger);
    }

    if (!Validator.isArrayLengthEqual(winningNumbers, LOTTO_RULE.size)) {
      throw new Error(MESSAGE.errorLottoCount);
    }

    if (Validator.hasDuplication(winningNumbers.map(Number))) {
      throw new Error(MESSAGE.errorLottoDuplicated);
    }

    if (!winningNumbers.every(
      Validator.isNumberInRange(LOTTO_RULE.minNumber, LOTTO_RULE.maxNumber + 1),
    )) {
      throw new Error(MESSAGE.errorLottoInRange);
    }
  },

  validateBonusNumber(bonusNumber, winningNumbers) {
    if (!Validator.isPositiveInteger(bonusNumber)) throw new Error(MESSAGE.errorPositiveInteger);

    if (!Validator.isNumberInRange(LOTTO_RULE.minNumber, LOTTO_RULE.maxNumber + 1)(bonusNumber)) {
      throw new Error(MESSAGE.errorLottoInRange);
    }

    if (winningNumbers.includes(Number(bonusNumber))) {
      throw new Error(MESSAGE.errorLottoDuplicated);
    }
  },

  validateRetryCommand(command) {
    if (
      !Validator.isSame(command.trim(), COMMANDS.RETRY)
      && !Validator.isSame(command.trim(), COMMANDS.QUIT)
    ) {
      throw new Error(MESSAGE.errorRetry);
    }
  },
};

export default LottoGameValidator;
