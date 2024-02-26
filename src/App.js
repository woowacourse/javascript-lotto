import LottoController from './controller/LottoController.js';

class App {
  #controller;

  constructor() {
    this.#controller = new LottoController();
  }

  // eslint-disable-next-line max-lines-per-function
  async run() {
    await this.#controller.issueLottos();
    await this.#controller.inputWinningInformations();
    this.#controller.analyzeLottoResults();
  }
}

export default App;
