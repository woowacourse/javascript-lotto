import { INPUT_MESSAGE } from "./constants/message.js";
import { isRetryAnswerValid } from "./validates/RetryAnswerValidator.js";

import MainController from "./controllers/console/MainController.js";

import OutputView from "./views/console/OutputView.js";
import InputView from "./views/console/InputView.js";

class App {
  #mainController;

  constructor() {
    this.#mainController = new MainController();
  }

  async run() {
    do {
      await this.#mainController.run();
    } while (await this.#askRetry());
  }

  async #askRetry() {
    const isAnswerValid = await this.#readRetryAnswer();
    return isAnswerValid;
  }

  async #readRetryAnswer() {
    try {
      const answerInput = await InputView.readStringWithMsg(INPUT_MESSAGE.RETRY);

      return isRetryAnswerValid(answerInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readRetryAnswer();
    }
  }
}

export default App;
