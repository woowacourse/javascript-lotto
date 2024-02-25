/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
import BonusNumberValidator from '../util/validation/BonusNumberValidator.js';
import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';
import RestartValidator from '../util/validation/RestartValidator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async getInputAndValidate(inputFunction, validateFunction) {
    const input = await this.tryInput(inputFunction, validateFunction);

    if (input) {
      return input;
    }

    return this.getInputAndValidate(inputFunction, validateFunction);
  }

  async tryInput(inputFunction, validateFunction) {
    try {
      const input = await inputFunction();
      return validateFunction(input) ?? input;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async inputPurchaseAmount() {
    const purchaseAmount = await this.getInputAndValidate(InputView.inputPurchaseAmount, (input) =>
      PurchaseAmountValidator.validate(parseInt(input.trim(), 10))
    );

    return parseInt(purchaseAmount.trim(), 10);
  }

  // eslint-disable-next-line max-lines-per-function
  async inputWinningNumbers() {
    const winningNumbers = await this.getInputAndValidate(
      InputView.inputWinningNumbers,
      (input) => {
        const numbers = input
          .split(OPTIONS.INPUT.winningNumbersDelimiter)
          .map((number) => Number(number.trim()));
        LottoNumbersValidator.validate(numbers);
        return numbers;
      }
    );

    return winningNumbers;
  }

  async inputBonusNumber(winningNumbers) {
    const inputBonusNumber = await this.getInputAndValidate(InputView.inputBonusNumber, (input) => {
      const bonusNumber = Number(input.trim());
      BonusNumberValidator.validate(bonusNumber, winningNumbers);
      return bonusNumber;
    });

    return inputBonusNumber;
  }

  // eslint-disable-next-line max-lines-per-function
  async inputRestartResponse() {
    const restartResponse = await this.getInputAndValidate(
      InputView.inputRestartResponse,
      (input) => {
        RestartValidator.validateIsIncluded(input);
        return input.toLowerCase();
      }
    );

    return restartResponse === 'y';
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

  determineLottoRanks({ lottos, winningNumbers, bonusNumber }) {
    return this.#lottoMachine.determineLottoRanks({ lottos, winningNumbers, bonusNumber });
  }

  calculateProfitRate(winningResult) {
    return this.#lottoMachine.calculateProfitRate(winningResult);
  }

  async runGame() {
    let restart;
    do {
      const lottos = await this.#purchaseLottos();
      const { winningNumbers, bonusNumber } = await this.#getNumbers();
      this.#showResult({ lottos, winningNumbers, bonusNumber });
      restart = await this.inputRestartResponse();
    } while (restart);
  }

  async #getNumbers() {
    const winningNumbers = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonusNumber(winningNumbers);

    return { winningNumbers, bonusNumber };
  }

  #showResult({ lottos, winningNumbers, bonusNumber }) {
    this.#showWinningResult({ lottos, winningNumbers, bonusNumber });
  }

  #showWinningResult({ lottos, winningNumbers, bonusNumber }) {
    const winningResult = this.determineLottoRanks({ lottos, winningNumbers, bonusNumber });
    const profitRate = this.calculateProfitRate(winningResult);
    this.displayWinningResult(winningResult, profitRate);
  }

  async #purchaseLottos() {
    const purchaseAmount = await this.inputPurchaseAmount();
    const issueQuantity = this.calculateIssueQuantity(purchaseAmount);
    const lottos = this.issueLottos(issueQuantity);

    this.displayIssueQuantity(issueQuantity);
    this.displayLottoNumbersList(lottos);

    return lottos;
  }
}

export default LottoController;
