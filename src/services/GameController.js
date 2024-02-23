import { RESTART_KEY } from '../constants';
import { LottoGame, Validator } from '../domains';
import { InputView, OutputView } from '../views';
import InputController from './InputController';

class GameController {
  #lottoGame;

  async playGame() {
    await this.#getPaid();

    const { lottoTickets } = this.#lottoGame.lottoData.lottoMachine;
    OutputView.printLottoTickets(lottoTickets);

    await this.#generateWinning();

    this.#lottoGame.calculateMatchingResult();
    this.#lottoGame.calculateStatistics();

    // 출력
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

      this.#lottoGame = new LottoGame(paymentAmountInput);
    });
  }

  async #generateWinning() {
    await this.#getValidWinningLottoNumbers();
    await this.#getValidBonusNumber();
  }

  async #getValidWinningLottoNumbers() {
    await InputController.retryOnInvalidInput(async () => {
      const lottoNumbersInput = await InputView.readWinningLottoNumbers();

      this.#lottoGame.winningLottoNumbers = lottoNumbersInput;
    });
  }

  async #getValidBonusNumber() {
    await InputController.retryOnInvalidInput(async () => {
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
    Validator.checkRestartForm(restartInput);

    if (restartInput === RESTART_KEY.restart) {
      OutputView.printRestartGameMessage();
      await this.playGame();
    } else {
      OutputView.printEndGameMessage();
    }
  }
}

export default GameController;
