import InputView from "../ui/InputView.js";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
  validateRestart,
} from "./validate.js";

const InputHandler = {
  async getPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmount = await InputView.readPurchaseAmount();
        validatePurchaseAmount(purchaseAmount);
        return purchaseAmount;
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  async getWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await InputView.readWinningNumbers();
        validateWinningNumbers(winningNumbers);
        return winningNumbers;
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const bonusNumber = await InputView.readBonusNumber();
        validateBonusNumber(bonusNumber, winningNumbers);
        return bonusNumber;
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  async getRestartAnswer() {
    while (true) {
      try {
        const restartAnswer = await InputView.readRestart();
        validateRestart(restartAnswer);
        return restartAnswer;
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};

export default InputHandler;
