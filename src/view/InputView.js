import Console from '../util/Console.js';
import MESSAGE from '../constant/messages.js';
import { LOTTO_RULE } from '../constant/constants.js';
import LottoGameValidator from './LottoValidator.js';

const InputView = {
  async readMoney() {
    const input = await Console.question(MESSAGE.inputMoney);

    LottoGameValidator.validateMoney(input);

    return Number(input);
  },

  async readWinningNumbers() {
    const input = await Console.question(MESSAGE.inputWinningNumbers);
    const winningNumbers = input.split(LOTTO_RULE.separator).map((number) => number.trim());

    LottoGameValidator.validateWinningNumbers(winningNumbers);

    return winningNumbers.map(Number);
  },

  async readBonusNumber(winningNumbers) {
    const input = await Console.question(MESSAGE.inputBonusNumber);

    LottoGameValidator.validateBonusNumber(input, winningNumbers);

    return Number(input);
  },

  async readRetry() {
    const input = await Console.question(MESSAGE.inputRetry);

    LottoGameValidator.validateRetryCommand(input);

    return input.trim().toLowerCase();
  },
};

export default InputView;
