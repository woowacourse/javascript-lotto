import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async inputPurchaseAmount() {
    const purchaseAmount = await InputView.inputPurchaseAmount();
    PurchaseAmountValidator.validate(purchaseAmount);
    return Number(purchaseAmount.trim());
  }

  async inputWinningNumbers() {
    const winningNumbers = await InputView.inputWinningNumbers();
    LottoNumbersValidator.validate(winningNumbers);
    return winningNumbers
      .split(OPTIONS.INPUT.winningNumbersDelimiter)
      .map((number) => Number(number.trim()));
  }

  async inputBonusNumber() {
    const bonusNumber = await InputView.inputBonusNumber();
    return Number(bonusNumber.trim());
  }

  async inputRestartResponse() {
    const restartResponse = await InputView.inputRestartResponse();
    return restartResponse.trim();
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

  issueLottos(issueQuantity) {
    return this.#lottoMachine.issueLottos(issueQuantity);
  }
}

export default LottoController;
