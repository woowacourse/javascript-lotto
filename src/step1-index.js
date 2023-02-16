import LottoGameController from './controller/LottoGameController.js';

class App {
  #lottoGameController = new LottoGameController();

  play() {
    this.#lottoGameController.startGame();
  }
}

const app = new App();
app.play();
