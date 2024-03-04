import handleIO from '../util/handleIO';
import Validator from '../validator/Validator';
import InputView from '../view/InputView';

const InputController1 = {
  async inputPurchaseAmount() {
    try {
      const purchaseAmount = await InputView.readPurchaseAmount();
      Validator.validatePurchaseAmount(purchaseAmount);
      return parseInt(purchaseAmount);
    } catch (error) {
      handleIO.print(error.message);
      return this.inputPurchaseAmount();
    }
  },

  async inputWinningNumbers() {
    try {
      const winningNumbers = await InputView.readWinningNumbers();
      Validator.validateWinningNumbers(winningNumbers);
      return winningNumbers
        .split(',')
        .filter((item) => item.trim() !== '')
        .map(Number);
    } catch (error) {
      handleIO.print(error.message);
      return this.inputWinningNumbers();
    }
  },

  async inputBonusNumber(winningNumbers) {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      Validator.validateBonusNumber(bonusNumber, winningNumbers);
      return parseInt(bonusNumber);
    } catch (error) {
      handleIO.print(error.message);
      return this.inputBonusNumber(winningNumbers);
    }
  },

  async inputRestartCommand() {
    try {
      const restartCommand = await InputView.readRestartCommand();
      const lowerCasedCommand = restartCommand.toLowerCase();
      Validator.validateRestartCommand(lowerCasedCommand);
      return lowerCasedCommand;
    } catch (error) {
      handleIO.print(error.message);
      return this.inputRestartCommand();
    }
  },
};

export default InputController1;
