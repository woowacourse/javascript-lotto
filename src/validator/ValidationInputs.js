import checkUnit from './amount.js';
import Console from '../utils/Console.js';
import { SPLITTER, UNIT } from '../constants/values.js';
import {
  checkBonusNumberFormat,
  checkWinningNumberRange,
  checkWinningNumbersFormat,
  checkWinningNumbersRange,
} from './lotto.js';
import checkRetryFormat from './retry.js';

const ValidationInputs = {
  amount(amount, errorCallback) {
    try {
      return this.checkAmount(amount);
    } catch (error) {
      Console.print(error.message);

      return errorCallback(errorCallback);
    }
  },

  checkAmount(amount) {
    checkUnit(amount, UNIT);

    return Number(amount);
  },

  winningNumbers(winningNumbers, errorCallback) {
    try {
      return this.checkWinningNumbers(winningNumbers);
    } catch (error) {
      Console.print(error.message);

      return errorCallback(errorCallback);
    }
  },

  checkWinningNumbers(numbers) {
    const winningNumbers = numbers.split(SPLITTER).map(Number);

    checkWinningNumbersFormat(numbers);
    checkWinningNumbersRange(winningNumbers);

    return winningNumbers;
  },

  bonusNumber(bonusNumber, errorCallback) {
    try {
      return this.checkBonusNumber(bonusNumber);
    } catch (error) {
      Console.print(error.message);

      return errorCallback(errorCallback);
    }
  },

  checkBonusNumber(number) {
    const bonusNumber = Number(number);

    checkBonusNumberFormat(number);
    checkWinningNumberRange(bonusNumber);

    return bonusNumber;
  },

  retry(command, errorCallback) {
    try {
      return this.checkRetry(command);
    } catch (error) {
      Console.print(error.message);

      return errorCallback(errorCallback);
    }
  },

  checkRetry(command) {
    checkRetryFormat(command);

    return command;
  },
};

export default ValidationInputs;
