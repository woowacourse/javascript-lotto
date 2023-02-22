import LottoController from './LottoController';
import Console from './utils/Console';
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
    do {
      await this.#lottoController.proceedBuyLottos();
      await this.#lottoController.proceedLottoResult();
      await this.#lottoController.proceedRestart();
    } while (!this.#lottoController.isFinished());

    Console.close();
  }
}

export default App;
