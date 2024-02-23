import Lotto from '../domain/lotto.js';
import WinningLotto from '../domain/winningLotto.js';
import ReadLine from '../utils/readLineAsync.js';
import { validateCost, validateRestartResponse } from '../utils/validation.js';
import { INPUT_MESSAGES } from '../constant/index.js';

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

  async readLotto() {
    try {
      const numbers = (await ReadLine.readLineAsync(INPUT_MESSAGES.winning_number))
        .split(',')
        .map((number) => Number(number));

      return new Lotto(numbers);
    } catch (error) {
      console.log(error.message);
      return this.readLotto();
    }
  },

  async readBonusNumber() {
    const bonusNumber = Number(await ReadLine.readLineAsync(INPUT_MESSAGES.bonus_number));

    return bonusNumber;
  },

  async readWinningLotto() {
    try {
      const lotto = await this.readLotto();
      const bonusNumber = await this.readBonusNumber();
      return new WinningLotto(lotto, bonusNumber);
    } catch (error) {
      console.log(error.message);
      return this.readWinningLotto();
    }
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
