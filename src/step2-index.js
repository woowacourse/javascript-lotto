import LottoGameController from './controller/LottoGameController.js';
import "../css/index.css";

class App {
  #lottoGameController = new LottoGameController();

  play() {
    this.#lottoGameController.startGame();
  }
}

const app = new App();
app.play();
