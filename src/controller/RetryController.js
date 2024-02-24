import InputView from "../view/InputView.js";
import getValidInput from "../utils/getValidInput.js";

class RetryController {
  retryFunction = null;
  #YES = "y";

  constructor(retryFunction) {
    this.retryFunction = retryFunction;
    this.#YES = "y";
  }

  #isRetry(retryInput) {
    return retryInput === this.#YES;
  }

  async retryGame() {
    const retryInput = await getValidInput(InputView.readRetryGame);

    if (this.#isRetry(retryInput)) {
      this.retryFunction();
    }
  }
}

export default RetryController;
