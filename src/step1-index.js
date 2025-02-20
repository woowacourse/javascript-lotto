import InputView from "./ui/InputView.js";
import purchase from "./LottoStore.js";
import { validateRestart } from "./util/validate.js";

class App {
  #running;

  constructor() {
    this.#running = true;
  }

  async start() {
    while(this.#running) {
      await purchase();

      const answer = await this.getRestartAnswer();
      this.endGame(answer);
    }
  }

  async getRestartAnswer() {
    const answer = await InputView.readRestart();
    validateRestart(answer);

    return answer;
  }

  endGame(answer) {
    if (answer.toLowerCase() === 'n') this.#running = false;
  }
}

export default App;

const app = new App();
app.start();
