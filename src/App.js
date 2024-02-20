import LottoController from './controller/LottoController';

class App {
  #LottoController;

  async run() {
    this.#LottoController = new LottoController();

    await this.#LottoController.start();
  }
}

export default App;