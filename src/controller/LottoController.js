import OPTIONS from '../constant/Options.js';
import InputView from '../view/InputView.js';

class LottoController {
  async inputPurchaseAmount() {
    const purchaseAmount = await InputView.inputPurchaseAmount().trim();
    return purchaseAmount;
  }

  async inputWinningNumbers() {
    const winningNumbers = await InputView.inputWinningNumbers()
      .split(OPTIONS.INPUT.winningNumbersDelimiter)
      .map((number) => number.trim());
    return winningNumbers;
  }

  async inputBonusNumber() {
    const bonusNumber = await InputView.inputBonusNumber().trim();
    return bonusNumber;
  }

  async inputRestartResponse() {
    const restartResponse = await InputView.inputRestartResponse().trim();
    return restartResponse;
  }
}

export default LottoController;
