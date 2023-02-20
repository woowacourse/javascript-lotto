import InputView from './view/InputView.js';
import LottoGame from './domain/LottoGame.js';
import OutputView from './view/OutputView.js';
import { COMMAND_YES } from './util/constants/constants.js';

class App {
  #lottoGame;

  #inputView;

  #outputView;

  constructor() {
    this.#lottoGame = new LottoGame();
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async play() {
    this.setUpGame();
    await this.issueLottos();
    await this.applyWinningLotto();
    this.showResult();

    await this.retryByCommand();
  }

  setUpGame() {
    this.#lottoGame = new LottoGame();
  }

  async issueLottos() {
    try {
      const money = await this.#inputView.readMoney();
      const lottos = this.#lottoGame.setLottos(money).getLottos();

      return this.#outputView.printLottos(lottos);
    } catch (error) {
      this.#outputView.print(error.message);
      return this.issueLottos();
    }
  }

  async applyWinningLotto() {
    try {
      const winningNumbers = await this.#inputView.readWinningNumbers();
      const bonusNumber = await this.#inputView.readBonusNumber();

      return this.#lottoGame.setWinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      this.#outputView.print(error.message);
      return this.applyWinningLotto();
    }
  }

  showResult() {
    const statisticsResult = this.#lottoGame.getGameResult();
    this.#outputView.printResult(statisticsResult);
  }

  async retryByCommand() {
    try {
      const command = await this.#inputView.readRetry();
      if (command === COMMAND_YES) {
        return this.play();
      }

      return OutputView.close();
    } catch (error) {
      this.#outputView.print(error.message);
      return this.retryByCommand();
    }
  }
}

const app = new App();
await app.play();
export default App;
