import purchase from "./LottoStore.js";
import InputHandler from "./util/InputHandler.js";
import RESTART_ANSWER from "./constant/answer.js";
import InputView from "./ui/InputView.js";
import { validateRestart } from "./util/validate.js";

class App {
  #running;

  constructor() {
    this.#running = true;
  }

  async runLotto() {
    while (this.#running) {
      await purchase();

      const answer = await InputHandler.getValidatedInput(InputView.readRestart, validateRestart);
      this.endGame(answer);
    }
  }

  endGame(answer) {
    if (answer.toLowerCase() === RESTART_ANSWER.NO) this.#running = false;
  }
}

export default App;
