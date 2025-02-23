import purchase from "./LottoStore.js";
import InputHandler from "./util/InputHandler.js";
import RESTART_ANSWER from "./constant/answer.js";

class App {
  #running;

  constructor() {
    this.#running = true;
  }

  async start() {
    while (this.#running) {
      await purchase();

      const answer = await InputHandler.getRestartAnswer();
      this.handleRestart(answer);
    }
  }

  handleRestart(answer) {
    if (answer.toLowerCase() === RESTART_ANSWER.NO) {
      this.endGame();
    }
  }

  endGame() {
    this.#running = false;
  }
}

export default App;

const app = new App();
app.start();
