import { CONFIG, MESSAGE } from '../constants';
import readLineAsync from '../utils/readLineAsync';
import {
  bonusNumberValidator,
  purchaseAmountValidator,
  restartValidator,
  winningNumbersValidator,
} from '../validators';
import OutputView from './OutputView';

const InputView = {
  async readPurchaseAmount() {
    try {
      const purchaseAmountInput = await readLineAsync(MESSAGE.PURCHASE_AMOUNT_INPUT);
      const purchaseAmount = purchaseAmountInput.trim();
      purchaseAmountValidator.validate(purchaseAmount);
      return purchaseAmount;
    } catch (error) {
      OutputView.print(error.message);
      return this.readPurchaseAmount();
    }
  },

  async readWinningNumbers() {
    try {
      const winningNumbersInput = await readLineAsync(MESSAGE.WINNING_NUMBERS_INPUT);
      const winningNumbers = winningNumbersInput.split(CONFIG.SEPARATOR).map(number => parseInt(number.trim(), 10));
      winningNumbersValidator.validate(winningNumbers);
      return winningNumbers;
    } catch (error) {
      OutputView.print(error.message);
      return this.readWinningNumbers();
    }
  },

  async readBonusNumber(winningNumbers) {
    try {
      const bonusNumberInput = await readLineAsync(MESSAGE.BONUS_NUMBER_INPUT);
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
      const restartInput = await readLineAsync(MESSAGE.RESTART);
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
