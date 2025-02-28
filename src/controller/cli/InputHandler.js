import parseAndValidateBonusNumber from "../../domain/processors/parseAndValidateBonusNumber.js";
import parseAndValidatePurchaseAmount from "../../domain/processors/parseAndValidatePurchaseAmount.js";
import parseAndValidateRestart from "../../domain/processors/parseAndValidateRestart.js";
import parseAndValidateWinningNumbers from "../../domain/processors/parseAndValidateWinningNumbers.js";
import retryCheckInput from "../../utils/retryCheckInput.js";
import InputView from "../../view/InputView.js";

const InputHandler = {
  async purchaseAmount() {
    const purchaseAmount = await retryCheckInput(InputView.purchaseAmount, parseAndValidatePurchaseAmount);
    return purchaseAmount;
  },

  async answerLotto() {
    const winningNumbers = await retryCheckInput(InputView.winningNumbers, parseAndValidateWinningNumbers);
    const bonusNumber = await retryCheckInput(InputView.bonusNumber, parseAndValidateBonusNumber(winningNumbers));

    return { winningNumbers, bonusNumber };
  },

  async reStart(restartLottoGame) {
    const restart = await retryCheckInput(InputView.restart, parseAndValidateRestart);
    if (restart) restartLottoGame();
  },
};

export default InputHandler;
