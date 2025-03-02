import InputHandler from '../input/InputHandler.js';
import OutputView from '../view/OutputView.js';
import { YES } from '../constants/constants.js';

class InputService {
  static async getPurchaseMoney() {
    try {
      const money = await InputHandler.purchaseMoney();
      OutputView.print('');
      return money;
    } catch (e) {
      OutputView.print(e.message);
      return await this.getPurchaseMoney();
    }
  }

  static async getWinningNumbers() {
    try {
      const winningNumbers = await InputHandler.winningNumbers();
      OutputView.print('');
      return winningNumbers;
    } catch (e) {
      OutputView.print(e.message);
      return await this.getWinningNumbers();
    }
  }

  static async getBonusNumber(winningNumbers) {
    try {
      const bonusNumber = await InputHandler.bonusNumber(winningNumbers);
      OutputView.print('');
      return bonusNumber;
    } catch (e) {
      OutputView.print(e.message);
      return await this.getBonusNumber(winningNumbers);
    }
  }

  static async reStart(runCallback) {
    try {
      const input = await InputHandler.reStart();
      OutputView.print('');
      if (input === YES) {
        return runCallback();
      }
      return input;
    } catch (e) {
      OutputView.print(e.message);
      return await this.reStart(runCallback);
    }
  }
}

export default InputService;
