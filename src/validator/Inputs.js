import checkUnit from './amount.js';
import Console from '../utils/Console.js';
import { GAME, LOTTO } from '../constants/values.js';
import {
  checkBonusNumberFormat,
  checkWinningNumberRange,
  checkWinningNumbersFormat,
  checkWinningNumbersRange,
} from './lotto.js';
import checkRetryFormat from './retry.js';

const Inputs = {
  async amount(amount, { onError: errorCallback }) {
    try {
      return this.checkAmount(amount);
    } catch (error) {
      Console.print(error.message);

      return await errorCallback({ onError: errorCallback });
    }
  },

  checkAmount(amount) {
    checkUnit(amount, LOTTO.UNIT);

    return Number(amount);
  },

  async winningNumbers(winningNumbers, { onError: errorCallback }) {
    try {
      return this.checkWinningNumbers(winningNumbers);
    } catch (error) {
      Console.print(error.message);

      return await errorCallback({ onError: errorCallback });
    }
  },

  checkWinningNumbers(numbers) {
    const winningNumbers = numbers.split(GAME.SPLITTER).map(Number);

    checkWinningNumbersFormat(numbers);
    checkWinningNumbersRange(winningNumbers);

    return winningNumbers;
  },

  async bonusNumber(bonusNumber, { onError: errorCallback }) {
    try {
      return this.checkBonusNumber(bonusNumber);
    } catch (error) {
      Console.print(error.message);

      return await errorCallback({ onError: errorCallback });
    }
  },

  checkBonusNumber(number) {
    const bonusNumber = Number(number);

    checkBonusNumberFormat(number);
    checkWinningNumberRange(bonusNumber);

    return bonusNumber;
  },

  async retry(command, { onError: errorCallback }) {
    try {
      return this.checkRetry(command);
    } catch (error) {
      Console.print(error.message);

      return await errorCallback({ onError: errorCallback });
    }
  },

  checkRetry(command) {
    checkRetryFormat(command);

    return command;
  },
};

export default Inputs;
