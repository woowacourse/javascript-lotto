import LottoController from './LottoController';
import InputView from './view/console/InputView';
import OutputView from './view/console/OutputView';

class App {
  /** @type {LottoController} */
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController({
      inputView: InputView,
      outputView: OutputView,
    });
  }

  async play() {
    this.repeatGame();
  }

  async repeatGame() {
    await this.playGame();
    const restart = await this.#lottoController.proceedRestartCommand();
    if (!restart) {
      return;
    }
    this.repeatGame();
  }

  async playGame() {
    await this.#lottoController.proceedBuyLottos();
    await this.#lottoController.proceedLottoResult();
  }
}

export default App;
