import Input from "../views/Input.js";
import Output from "../views/Output.js";
import LottoGame from "../domains/LottoGame.js";
import Controller from "../controllers/Controller.js";

class Application {
  static start() {
    const input = new Input();
    const output = new Output();
    const lottoGame = new LottoGame();

    const controller = new Controller(input, output, lottoGame);
    controller.start();
  }
}

Application.start();
