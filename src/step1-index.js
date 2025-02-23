import purchase from "./LottoStore.js";
import InputHandler from "./util/InputHandler.js";
import RESTART_ANSWER from "./constant/answer.js";

class App {
  #running;

  constructor() {
    this.#running = true;
  }

  async run() {
    while (this.#running) {
      await this.start();

      const answer = await InputHandler.getRestartAnswer();
      this.handleRestart(answer);
    }
  }

  async start() {
    await purchase();
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
app.run();
