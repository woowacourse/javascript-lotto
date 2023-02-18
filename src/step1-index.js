import LottoGameController from './controllers/LottoGameController.js';

class App {
  #lottoGameController = new LottoGameController();

  play() {
    this.#lottoGameController.start();
  }
}

const app = new App();
app.play();
