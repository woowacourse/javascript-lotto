import purchase from "./LottoStore.js";
import RESTART_ANSWER from "./constant/answer.js";
import InputView from "./ui/InputView.js";
import retryAsync from "./util/retryAsync.js";
import { validateRestart } from "./util/validate.js";

class App {
  #running;

  constructor() {
    this.#running = true;
  }

  async runLotto() {
    while (this.#running) {
      await purchase();

      const restart = await retryAsync(this.getRestart);
      this.endGame(restart);
    }
  }

  async getRestart() {
    const answer = await InputView.readRestart();
    validateRestart(answer);

    return answer;
  }

  endGame(restart) {
    if (restart.toLowerCase() === RESTART_ANSWER.NO) this.#running = false;
  }
}

export default App;
