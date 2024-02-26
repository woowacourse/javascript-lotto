import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
import WinningLotto from '../domain/WinningLotto.js';
import retryAsyncWithErrorLogging from '../util/retryAsyncWithErrorLogging.js';
import { validate, validations } from '../util/validation.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  #lottoMachine;

  #lottos;

  #winningLotto;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async issueLottos() {
    const purchaseAmount = await retryAsyncWithErrorLogging(
      async () => this.#inputPurchaseAmount(),
      OPTIONS.INPUT.retryCount
    );
    const issueQuantity = this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
    this.#lottos = this.#lottoMachine.issueLottos(issueQuantity);

    OutputView.printIssueQuantity(issueQuantity);
    OutputView.printLottoNumbersList(this.#lottos.map((lotto) => lotto.getNumbers()));
  }

  async inputWinningInformations() {
    const winningNumbers = await retryAsyncWithErrorLogging(
      async () => this.#inputWinningNumbers(),
      OPTIONS.INPUT.retryCount
    );
    const bonusNumber = await retryAsyncWithErrorLogging(
      async () => this.#inputBonusNumber(winningNumbers),
      OPTIONS.INPUT.retryCount
    );
    this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  }

  analyzeLottoResults() {
    const winningResult = this.#lottoMachine.determineLottoRanks(this.#lottos, this.#winningLotto);
    const profitRate = this.#lottoMachine.calculateProfitRate(winningResult);

    OutputView.printWinningResult(winningResult, profitRate);
  }

  async #inputPurchaseAmount() {
    const purchaseAmountInput = await InputView.inputPurchaseAmount();
    const purchaseAmount = Number(purchaseAmountInput);
    this.#validatePurchaseAmount(purchaseAmount);

    return purchaseAmount;
  }

  async #inputWinningNumbers() {
    const winningNumbersInput = await InputView.inputWinningNumbers();
    const winningNumbers = winningNumbersInput
      .split(OPTIONS.INPUT.winningNumbersDelimiter)
      .map((number) => Number(number));
    this.#validateLottoNumbers(winningNumbers);

    return winningNumbers;
  }

  async #inputBonusNumber(winningNumbers) {
    const bonusNumberInput = await InputView.inputBonusNumber();
    const bonusNumber = Number(bonusNumberInput);
    this.#validateBounsNumber(winningNumbers, bonusNumber);

    return bonusNumber;
  }

  async #inputRestartResponse() {
    const restartResponseInput = await InputView.inputRestartResponse();
    const restartResponse = restartResponseInput.trim().toLowerCase();
    this.#validateRestartResponse(restartResponseInput);

    return restartResponse;
  }

  #validatePurchaseAmount(purchaseAmount) {
    validate(validations.isInteger, purchaseAmount, '구매금액');
    validate(validations.isAtLeast, purchaseAmount, OPTIONS.LOTTO.price, '구매금액');
  }

  #validateLottoNumbers(lottoNumbers, bonusNumber = null) {
    validate(validations.isUnique, lottoNumbers);
    validate(validations.hasLength, lottoNumbers, OPTIONS.LOTTO.count);
    lottoNumbers.forEach((number) => {
      validate(validations.isInteger, number);
      validate(validations.isInRange, number, OPTIONS.LOTTO.minNumber, OPTIONS.LOTTO.maxNumber);
    });

    if (bonusNumber) {
      this.#validateBounsNumber(lottoNumbers, bonusNumber);
    }
  }

  #validateBounsNumber(lottoNumbers, bonusNumber) {
    validate(validations.isInteger, bonusNumber);
    validate(validations.isInRange, bonusNumber, OPTIONS.LOTTO.minNumber, OPTIONS.LOTTO.maxNumber);
    validate(validations.isUnique, [...lottoNumbers, bonusNumber]);
  }

  #validateRestartResponse(restartResponse) {
    validate(validations.isInclude, Object.keys(OPTIONS.RESTART), restartResponse);
  }
}

export default LottoController;
