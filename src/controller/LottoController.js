import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

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

  displayIssueQuantity(issueQuantity) {
    OutputView.printIssueQuantity(issueQuantity);
  }

  displayLottoNumbersList(lottos) {
    const lottoNumbersList = lottos.map((lotto) => lotto.getNumbers());
    OutputView.printLottoNumbersList(lottoNumbersList);
  }

  displayWinningResult(winningResult, profitRate) {
    OutputView.printWinningResult(winningResult, profitRate);
  }

  calculateIssueQuantity(purchaseAmount) {
    return this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
  }

  determineLottoRanks(lottos, winningNumbers, bonusNumber) {
    return this.#lottoMachine.determineLottoRanks(lottos, winningNumbers, bonusNumber);
  }

  calculateProfitRate(winningResult) {
    return this.#lottoMachine.calculateProfitRate(winningResult);
  }
}

export default LottoController;
