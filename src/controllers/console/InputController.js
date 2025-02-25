import InputView from "../../views/console/InputView.js";
import getValidInput from "../../utils/getValidInput.js";
import validatePurchaseAmount from "../../validations/validatePurchaseAmount.js";
import validateWinningNumbers from "../../validations/validateWinningNumbers.js";
import validateBonusNumber from "../../validations/validateBonusNumber.js";
import validateRestartConfirm from "../../validations/validateRestartConfirm.js";

const InputController = {
  async getValidPurchaseAmount() {
    return await getValidInput(
      InputView.readPurchaseAmount,
      validatePurchaseAmount,
    );
  },

  async getValidWinningNumbers() {
    return await getValidInput(
      InputView.readWinningNumbers,
      validateWinningNumbers,
    );
  },

  async getValidBonusNumber(winningNumbers) {
    return await getValidInput(
      InputView.readBonusNumber,
      validateBonusNumber,
      winningNumbers,
    );
  },

  async getValidRestartConfirm() {
    return await getValidInput(
      InputView.readRestartConfirm,
      validateRestartConfirm,
    );
  },
};

export default InputController;
