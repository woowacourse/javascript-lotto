import LottoGameController from "./controller/lottoGameController.js";

class App {
  async run() {
    const controller = new LottoGameController();
    await controller.start();
  }
}

export default App;
