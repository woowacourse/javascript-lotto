import handleIO from '../util/handleIO';
import Validator from '../validator/Validator';
import InputView from '../view/InputView';

const InputController = {
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
      return winningNumbers.split(',').map((number) => parseInt(number.trim()));
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
      Validator.validateRestartCommand(restartCommand);
      return restartCommand.toLowerCase();
    } catch (error) {
      handleIO.print(error.message);
      return this.inputRestartCommand();
    }
  },
};

export default InputController;
