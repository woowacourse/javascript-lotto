import LottoGameController from "./controller/lottoGameController.js";

class App {
  async run() {
    const controller = new LottoGameController();
    await controller.play();
  }
}

export default App;
