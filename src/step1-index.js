import LottoController from './LottoController.js';

class App {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController();
  }

  play() {
    this.#lottoController.startGame();
  }
}

const app = new App();
app.play();
