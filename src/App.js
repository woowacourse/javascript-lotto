import LottoController from './LottoController';

class App {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController();
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
    await this.#lottoController.proceedWinningLotto();
    this.#lottoController.proceedLottoResult();
  }
}

export default App;
