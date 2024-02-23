import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';
import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';
import BonusNumberValidator from '../util/validation/BonusNumberValidator.js';
import RestartValidator from '../util/validation/RestartValidator.js';
class LottoController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async inputPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmount = await InputView.inputPurchaseAmount();
        const amount = parseInt(purchaseAmount.trim());
        PurchaseAmountValidator.validate(amount);
        return amount;
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async inputWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await InputView.inputWinningNumbers();
        const numbers = winningNumbers
          .split(OPTIONS.INPUT.winningNumbersDelimiter)
          .map((number) => Number(number.trim()));
        LottoNumbersValidator.validate(numbers);
        return numbers;
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async inputBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await InputView.inputBonusNumber();
        const bonusNumber = Number(input.trim());
        BonusNumberValidator.validate(bonusNumber, winningNumbers);
        return bonusNumber;
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async inputRestartResponse() {
    while (true) {
      try {
        const restartResponse = await InputView.inputRestartResponse();
        RestartValidator.validateIsIncluded(restartResponse);
        return restartResponse.toLowerCase() === 'y';
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  displayIssueQuantity(issueQuantity) {
    OutputView.printIssueQuantity(issueQuantity);
  }

  issueLottos(issueQuantity) {
    return this.#lottoMachine.issueLottos(issueQuantity);
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

  async runGame() {
    let restart;
    do {
      const lottos = await this.#purchaseLottos();

      const winningNumbers = await this.inputWinningNumbers();
      const bonusNumber = await this.inputBonusNumber(winningNumbers);

      this.#showWinningResult(lottos, winningNumbers, bonusNumber);

      restart = await this.inputRestartResponse();
    } while (restart);
  }

  async #purchaseLottos() {
    const purchaseAmount = await this.inputPurchaseAmount();
    const issueQuantity = this.calculateIssueQuantity(purchaseAmount);
    const lottos = this.issueLottos(issueQuantity);

    this.displayIssueQuantity(issueQuantity);
    this.displayLottoNumbersList(lottos);

    return lottos;
  }

  #showWinningResult(lottos, winningNumbers, bonusNumber) {
    const winningResult = this.determineLottoRanks(lottos, winningNumbers, bonusNumber);
    const profitRate = this.calculateProfitRate(winningResult);
    this.displayWinningResult(winningResult, profitRate);
  }
}

export default LottoController;
