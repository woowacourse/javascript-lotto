import InputHandler from '../input/InputHandler.js';
import { YES } from '../constants/constants.js';

class InputService {
  static async getPurchaseMoney() {
    try {
      const money = await InputHandler.purchaseMoney();
      return money;
    } catch (e) {
      return await this.getPurchaseMoney();
    }
  }

  static async getWinningNumbers() {
    try {
      const winningNumbers = await InputHandler.winningNumbers();
      return winningNumbers;
    } catch (e) {
      return await this.getWinningNumbers();
    }
  }

  static async getBonusNumber(winningNumbers) {
    try {
      const bonusNumber = await InputHandler.bonusNumber(winningNumbers);
      return bonusNumber;
    } catch (e) {
      return await this.getBonusNumber(winningNumbers);
    }
  }

  static async reStart(runCallback) {
    try {
      const input = await InputHandler.reStart();
      if (input === YES) {
        return runCallback();
      }
      return input;
    } catch (e) {
      return await this.reStart(runCallback);
    }
  }
}

export default InputService;
