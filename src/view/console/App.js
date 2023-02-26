import LottoController from '../../LottoController';
import Console from '../../utils/Console';

class App {
  /** @type {LottoController} */
  #lottoController;

  /**
   * @param {LottoController} lottoController
   */
  constructor(lottoController) {
    this.#lottoController = lottoController;
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
