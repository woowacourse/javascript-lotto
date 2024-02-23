import { SYMBOL } from '../constant/constants.js';
import { INPUT_MESSAGES } from '../constant/messages.js';
import Lotto from '../domain/lotto.js';
import WinningLotto from '../domain/winningLotto.js';
import ReadLine from '../utils/readLineAsync.js';
import { validateCost, validateRestartResponse } from '../utils/validation.js';

const InputView = {
  async readCost() {
    try {
      const cost = Number(await ReadLine.readLineAsync(INPUT_MESSAGES.cost));
      validateCost(cost);
      return cost;
    } catch (error) {
      console.log(error.message);
      return this.readCost();
    }
  },

  async readWinningNumbers() {
    const numbers = (await ReadLine.readLineAsync(INPUT_MESSAGES.winningNumber))
      .split(SYMBOL.delimiter)
      .map((number) => Number(number));

    return numbers;
  },

  async readBonusNumber() {
    const bonusNumber = Number(await ReadLine.readLineAsync(INPUT_MESSAGES.bonusNumber));

    return bonusNumber;
  },

  async readRestart() {
    try {
      const restartResponse = await ReadLine.readLineAsync(INPUT_MESSAGES.restart);
      validateRestartResponse(restartResponse);

      return restartResponse;
    } catch (error) {
      console.log(error.message);
      return this.readRestart();
    }
  },
};

export default InputView;
