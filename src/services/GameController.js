import { ERROR_MESSAGE, RESTART_KEY } from '../constants';
import { LottoGame } from '../domains';
import { isValidRestartInputForm } from '../domains/validator/validators';
import { isEmptyInput } from '../utils';
import { InputView, OutputView } from '../views';

import InputController from './InputController';

class GameController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  async playGame() {
    await InputController.retryOnInvalidInput(async () => this.#getPaid());
    this.#printLottoTickets();

    await InputController.retryOnInvalidInput(async () =>
      this.#generateWinningLotto(),
    );
    this.#lottoGame.calculateStatistics();
    this.#printStatistics();

    await InputController.retryOnInvalidInput(
      async () => await this.#restartLottoGame(),
    );
  }

  async #getPaid() {
    const paymentAmountInput = await InputView.readPaymentAmount();
    this.#lottoGame.insertMoney(paymentAmountInput);
  }

  async #generateWinningLotto() {
    const lottoNumbersInput = await InputView.readWinningLottoNumbers();
    const bonusNumberInput = await InputView.readBonusNumber();

    this.#lottoGame.issueWinningLotto(lottoNumbersInput, bonusNumberInput);
  }

  async #restartLottoGame() {
    const restartInput = (await InputView.readRestart()).toLowerCase();
    this.#validateRestartForm(restartInput);

    const { restart } = RESTART_KEY;
    if (restartInput === restart) {
      this.#lottoGame = new LottoGame();
      await this.playGame();
    }
  }

  #printLottoTickets() {
    const { lottoTickets } = this.#lottoGame;
    OutputView.printLottoTickets(lottoTickets);
  }

  #printStatistics() {
    const { statisticsResult, profitRate } = this.#lottoGame.lottoAnalytics;
    OutputView.printStatistics(statisticsResult);
    OutputView.printProfitRate(profitRate);
  }

  #validateRestartForm(restartInput) {
    if (isEmptyInput(restartInput)) throw new Error(ERROR_MESSAGE.emptyInput);

    if (!isValidRestartInputForm(restartInput))
      throw new Error(ERROR_MESSAGE.invalidRestartInputForm);
  }
}

export default GameController;
