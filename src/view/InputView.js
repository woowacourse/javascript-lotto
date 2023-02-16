import Console from '../util/Console.js';
import Validator from '../util/Validator.js';
import MESSAGE from '../constant/messages.js';
import { LOTTO_RULE } from '../constant/constants.js';

const InputView = {
  async readMoney() {
    const input = await Console.question(MESSAGE.inputMoney);

    if (!Validator.isPositiveInteger(input)) throw new Error(MESSAGE.errorPositiveInteger);

    if (!Validator.isNumberInRange(1000, Number.MAX_SAFE_INTEGER)(input)) {
      throw new Error(MESSAGE.errorMoneyRange);
    }

    return Number(input);
  },

  async readWinningNumbers() {
    const input = await Console.question(MESSAGE.inputWinningNumbers);
    const winningNumbers = input.split(LOTTO_RULE.separator).map((number) => number.trim());

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

    return winningNumbers.map(Number);
  },

  async readBonusNumber(winningNumbers) {
    const input = await Console.question(MESSAGE.inputBonusNumber);

    if (!Validator.isPositiveInteger(input)) throw new Error(MESSAGE.errorPositiveInteger);

    if (!Validator.isNumberInRange(LOTTO_RULE.minNumber, LOTTO_RULE.maxNumber + 1)(input)) {
      throw new Error(MESSAGE.errorLottoInRange);
    }

    if (winningNumbers.includes(Number(input))) {
      throw new Error(MESSAGE.errorLottoDuplicated);
    }

    return Number(input);
  },

  async readRetry() {
    const input = await Console.question(MESSAGE.inputRetry);
    if (!Validator.isSame(input.trim(), 'y') && !Validator.isSame(input.trim(), 'n')) {
      throw new Error(MESSAGE.errorRetry);
    }
    return input.trim().toLowerCase();
  },
};

export default InputView;
