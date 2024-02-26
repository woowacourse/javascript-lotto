import RETRY from "../constants/retryConstants.js";
import InputView from "../view/InputView.js";
import getValidInput from "../utils/getValidInput.js";

class RetryController {
  #retryFunction = null;

  constructor(retryFunction) {
    this.#retryFunction = retryFunction;
  }

  #isRetry(retryInput) {
    return retryInput === RETRY.YES;
  }

  async retryGame() {
    const retryInput = await getValidInput(InputView.readRetryGame);

    if (this.#isRetry(retryInput)) {
      this.#retryFunction();
    }
  }
}

export default RetryController;
