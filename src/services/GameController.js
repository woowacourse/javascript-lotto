import { RESTART_KEY } from '../constants';
import { LottoGame, Validator } from '../domains';
import { InputView, OutputView } from '../views';

import InputController from './InputController';

class GameController {
  #lottoGame = new LottoGame();

  async playGame() {
    await InputController.retryOnInvalidInput(async () => this.#getPaid());

    this.#printLottoTickets();

    await InputController.retryOnInvalidInput(async () =>
      this.#generateWinningLotto(),
    );

    this.#lottoGame.calculateStatistics();

    this.#printStatistics();

    await this.#restartLottoGame();
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
    await InputController.retryOnInvalidInput(
      async () => await this.#restartLottoGameAction(),
    );
  }

  async #restartLottoGameAction() {
    const restartInput = await InputView.readRestart();
    Validator.chaeckRestartForm(restartInput);

    if (restartInput === RESTART_KEY.restart) {
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
}

export default GameController;
