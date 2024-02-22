import { RESTART_KEY } from '../constants';
import { LottoGame, Validator } from '../domains';
import { InputView, OutputView } from '../views';

import InputController from './InputController';

class GameController {
  #lottoGame = new LottoGame();

  async playGame() {
    await this.#getPaid();

    const { lottoTickets } = this.#lottoGame.lottoData.lottoMachine;
    OutputView.printLottoTickets(lottoTickets);

    await this.#generateWinning();

    this.#lottoGame.calculateMatchingResult();
    this.#lottoGame.calculateStatistics();

    this.#printStatistics();

    await this.#restartLottoGame();
  }

  #printStatistics() {
    const { statisticsResult, profitRate } = this.#lottoGame.lottoAnalytics;
    OutputView.printStatistics(statisticsResult);
    OutputView.printProfitRate(profitRate);
  }

  async #getPaid() {
    await InputController.retryOnInvalidInput(async () => {
      const paymentAmountInput = await InputView.readPaymentAmount();

      this.#lottoGame.insertMoney(paymentAmountInput);
    });
  }

  async #generateWinning() {
    await this.#getValidWinningLottoNumbers();
    await this.#getValidBonusNumber();
  }

  async #getValidWinningLottoNumbers() {
    return await InputController.retryOnInvalidInput(async () => {
      const lottoNumbersInput = await InputView.readWinningLottoNumbers();

      this.#lottoGame.winningLottoNumbers = lottoNumbersInput;
    });
  }

  async #getValidBonusNumber() {
    return await InputController.retryOnInvalidInput(async () => {
      const bonusNumberInput = await InputView.readBonusNumber();

      this.#lottoGame.bonusNumber = bonusNumberInput;
    });
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
}

export default GameController;
