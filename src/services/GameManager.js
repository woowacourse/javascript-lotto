import { GameRestartChecker } from '../domains';
import { InputView, OutputView } from '../views';
import InputController from './InputController';
import LottoGame from './LottoGame';

class GameManager {
  #lottoGame = new LottoGame();

  /**
   * @property {GameRestartChecker} gameRestartChecker
   */
  #gameRestartChecker;

  async playGame() {
    await this.#lottoGame.issueLottoTicketsToBuyer();
    await this.#lottoGame.generateWinningLotto();
    await this.#lottoGame.generateBonusNumber();

    const lottoAnalytics = this.#lottoGame.getLottoAnalytics();
    // 출력
    this.#printStatistics(lottoAnalytics);

    await this.#restartLottoGame();
  }

  /**
   * @param {profitRate: number,statisticsResult: {1:number, 2:number ,3:number, 4:number, 5:number}}} lottoAnalytics
   */
  // eslint-disable-next-line
  #printStatistics(lottoAnalytics) {
    const { profitRate, statisticsResult } = lottoAnalytics;

    OutputView.printStatistics(statisticsResult);
    OutputView.printProfitRate(profitRate);
  }

  async #restartLottoGame() {
    await InputController.retryOnInvalidInput(async () => {
      const restartInput = await InputView.readRestart();

      this.#gameRestartChecker = new GameRestartChecker(restartInput);
    });

    if (this.#gameRestartChecker.isRestart) {
      OutputView.printRestartGameMessage();

      this.#lottoGame = new LottoGame();

      await this.playGame();
    } else {
      OutputView.printEndGameMessage();
    }
  }
}

export default GameManager;
