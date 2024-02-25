import LottoController from './controller/LottoController.js';

class App {
  #controller;

  constructor() {
    this.#controller = new LottoController();
  }

  async run() {
    await this.#controller.runGame();
  }
}

export default App;
