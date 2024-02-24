import { LottoResultsHelper, Statistics } from '../domains';
import { InputView, OutputView } from '../views';
import InputController from './InputController';

class LottoGame {
  #lottoResultHelper = new LottoResultsHelper();

  /**
   * @property {Statistics} statistics
   */
  #statistics;

  async issueLottoTicketsToBuyer() {
    await this.#getPaid();
    this.#printPurchasedLottoTickets();
  }

  async generateWinningLotto() {
    await InputController.retryOnInvalidInput(async () => {
      const lottoNumbersInput = await InputView.readWinningLottoNumbers();

      this.#lottoResultHelper.generateWinningLotto(lottoNumbersInput);
    });
  }

  async generateBonusNumber() {
    await InputController.retryOnInvalidInput(async () => {
      const bonusNumberInput = await InputView.readBonusNumber();

      this.#lottoResultHelper.generateBonus(bonusNumberInput);
    });
  }

  getLottoAnalytics() {
    const matchingResults = this.#lottoResultHelper.calculateMatchingResults();

    this.#statistics = new Statistics(
      matchingResults,
      this.#lottoResultHelper.paymentAmount,
    );

    return this.#statistics.lottoAnalytics;
  }

  async #getPaid() {
    await InputController.retryOnInvalidInput(async () => {
      const paymentAmountInput = await InputView.readPaymentAmount();

      this.#lottoResultHelper.generateLottoMachine(paymentAmountInput);
    });
  }

  #printPurchasedLottoTickets() {
    OutputView.printLottoTickets(this.#lottoResultHelper.lottoTickets);
  }
}

export default LottoGame;
