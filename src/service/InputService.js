import InputHandler from '../input/InputHandler.js';

class InputService {
  static async getPurchaseMoney() {
    try {
      return await InputHandler.purchaseMoney();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async getWinningNumbers() {
    try {
      return await InputHandler.winningNumbers();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async getBonusNumber(winningNumbers) {
    try {
      return await InputHandler.bonusNumber(winningNumbers);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async reStart() {
    try {
      return await InputHandler.reStart();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default InputService;
