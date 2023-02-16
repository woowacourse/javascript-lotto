import checkUnit from './amount.js';
import Console from '../utils/Console.js';
import { UNIT } from '../constants/values.js';
import {
  checkBonusNumberFormat,
  checkWinningNumberRange,
  checkWinningNumbersFormat,
  checkWinningNumbersRange,
} from './lotto.js';

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
    checkUnit(amount, UNIT);

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
    const winningNumbers = numbers.split(',').map(Number);

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
};

export default Inputs;
