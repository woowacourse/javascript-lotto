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
<<<<<<< HEAD
      this.#retryFunction();
=======
      this.retryFunction();
>>>>>>> 4f82b7a (refactor: 게임 재시작 로직 별도 컨트롤러로 분리)
    }
  }
}

export default RetryController;
