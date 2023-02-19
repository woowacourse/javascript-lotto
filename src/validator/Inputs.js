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
  amount(amount, { onError: errorCallback }) {
    try {
      return this.checkAmount(amount);
    } catch (error) {
      Console.print(error.message);

      return errorCallback({ onError: errorCallback });
    }
  },

  checkAmount(amount) {
    checkUnit(amount, LOTTO.UNIT);

    return Number(amount);
  },

  winningNumbers(winningNumbers, { onError: errorCallback }) {
    try {
      return this.checkWinningNumbers(winningNumbers);
    } catch (error) {
      Console.print(error.message);

      return errorCallback({ onError: errorCallback });
    }
  },

  checkWinningNumbers(numbers) {
    const winningNumbers = numbers.split(GAME.SPLITTER).map(Number);

    checkWinningNumbersFormat(numbers);
    checkWinningNumbersRange(winningNumbers);

    return winningNumbers;
  },

  bonusNumber(bonusNumber, { onError: errorCallback }) {
    try {
      return this.checkBonusNumber(bonusNumber);
    } catch (error) {
      Console.print(error.message);

      return errorCallback({ onError: errorCallback });
    }
  },

  checkBonusNumber(number) {
    const bonusNumber = Number(number);

    checkBonusNumberFormat(number);
    checkWinningNumberRange(bonusNumber);

    return bonusNumber;
  },

  retry(command, { onError: errorCallback }) {
    try {
      return this.checkRetry(command);
    } catch (error) {
      Console.print(error.message);

      return errorCallback({ onError: errorCallback });
    }
  },

  checkRetry(command) {
    checkRetryFormat(command);

    return command;
  },
};

export default Inputs;
