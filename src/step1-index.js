import LottoGameController from "./controller/LottoGameController.js";

class App {
  #lottoGameController = new LottoGameController();

  play() {
    this.#lottoGameController.setupGame();
  }
}

const app = new App();
app.play();