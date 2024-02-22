import { RESTART_KEY, OUTPUT_MESSAGES, WINNING_RULE } from '../constants';
import { LottoGame, Validator } from '../domains';
import { Console } from '../utils';
import InputView from '../views/InputView';
import OutputView from '../views/OutputView';
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

      this.#lottoGame.insertMoney(paymentAmountInput);
    });
  }

  async #generateWinning() {
    await this.#getValidWinningLottoNumbers();
    await this.#getValidBonusNumber();
  }

  async #getValidWinningLottoNumbers() {
    return await InputController.retryOnInvalidInput(async () => {
      //입력값 가져오기
      const lottoNumbersInput = await InputView.readWinningLottoNumbers();
      // 유효성 검사
      this.#lottoGame.winningLottoNumbers = lottoNumbersInput;
    });
  }

  async #getValidBonusNumber() {
    return await InputController.retryOnInvalidInput(async () => {
      //입력값 가져오기
      const bonusNumberInput = await InputView.readBonusNumber();
      // 유효성 검사
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
