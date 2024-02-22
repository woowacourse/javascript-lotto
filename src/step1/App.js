import LottoController from "./controllers/LottoController";

class App {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController();
  }

  async run() {
    await this.#lottoController.run();
  }
}

export default App;
