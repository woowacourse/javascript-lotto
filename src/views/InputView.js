import { CONFIG_FORMAT } from '../constants/config';
import { MESSAGE } from '../constants/message';
import readLineAsync from '../utils/readLineAsync';
import bonusNumberValidator from '../validators/bonusNumberValidator';
import purchaseAmountValidator from '../validators/purchaseAmountValidator';
import OutputView from './OutputView';
import restartValidator from '../validators/restartValidator';
import winningNumbersValidator from '../validators/winningNumbersValidator';

const InputView = {
  readWithMessage(message) {
    return readLineAsync(message);
  },

  async readPurchaseAmount() {
    try {
      const purchaseAmountInput = await this.readWithMessage(MESSAGE.PURCHASE_AMOUNT_INPUT);
      const purchaseAmount = purchaseAmountInput.trim();
      purchaseAmountValidator.validate(purchaseAmount);
      return parseInt(purchaseAmount, 10);
    } catch (error) {
      OutputView.print(error.message);
      return this.readPurchaseAmount();
    }
  },

  async readWinningNumbers() {
    try {
      const winningNumbersInput = await this.readWithMessage(MESSAGE.WINNING_NUMBERS_INPUT);
      let winningNumbers = winningNumbersInput.split(CONFIG_FORMAT.SEPARATOR);
      winningNumbers = winningNumbers.map(number => parseInt(number.trim(), 10));
      winningNumbersValidator.validate(winningNumbers);
      return winningNumbers;
    } catch (error) {
      OutputView.print(error.message);
      return this.readWinningNumbers();
    }
  },

  async readBonusNumber(winningNumbers) {
    try {
      const bonusNumberInput = await this.readWithMessage(MESSAGE.BONUS_NUMBER_INPUT);
      const bonusNumber = parseInt(bonusNumberInput, 10);
      bonusNumberValidator.validate(bonusNumber, winningNumbers);
      return bonusNumber;
    } catch (error) {
      OutputView.print(error.message);
      return this.readBonusNumber(winningNumbers);
    }
  },

  async readRestart() {
    try {
      const restartInput = await this.readWithMessage(MESSAGE.RESTART);
      const restart = restartInput.toLowerCase();
      restartValidator.validate(restart);
      return restart;
    } catch (error) {
      OutputView.print(error.message);
      return this.readRestart();
    }
  },
};

export default InputView;
