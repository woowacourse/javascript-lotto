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
    let amount;
    while (true) {
      try {
        const purchaseAmount = await InputView.inputPurchaseAmount();
        amount = parseInt(purchaseAmount.trim());
        PurchaseAmountValidator.validate(amount);
        break;
      } catch (error) {
        console.error(error.message);
      }
    }
    return amount;
  }

  async inputWinningNumbers() {
    let numbers;
    while (true) {
      try {
        const winningNumbers = await InputView.inputWinningNumbers();
        numbers = winningNumbers
          .split(OPTIONS.INPUT.winningNumbersDelimiter)
          .map((number) => Number(number.trim()));
        LottoNumbersValidator.validate(numbers);
        break;
      } catch (error) {
        console.error(error.message);
      }
    }

    return numbers;
  }

  async inputBonusNumber(winningNumbers) {
    let bonusNumber;
    while (true) {
      try {
        const input = await InputView.inputBonusNumber();
        bonusNumber = Number(input.trim());
        BonusNumberValidator.validate(bonusNumber, winningNumbers);
        break;
      } catch (error) {
        console.error(error.message);
      }
    }
    return bonusNumber;
  }

  async inputRestartResponse() {
    let restartResponse;
    while (true) {
      try {
        restartResponse = await InputView.inputRestartResponse();
        RestartValidator.validateIsIncluded(restartResponse);
        break;
      } catch (error) {
        console.error(error.message);
      }
    }
    return restartResponse.toLowerCase() === 'y';
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
}

export default LottoController;
