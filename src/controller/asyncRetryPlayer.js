import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs";

import MESSAGES from "../view/constants/messages";

class AsyncRetryPlayer {
  static MAX_RETRY_STACK_COUNT = 2;

  #RETRY_YES = ["y", "Y"];

  #RETRY_NO = ["n", "N"];

  #mainClass;

  #inputView;

  constructor(mainClass, inputView) {
    this.#mainClass = mainClass;
    this.#inputView = inputView;
  }

  async start() {
    this.recursiveRetry();
  }

  async recursiveRetry(count = 0) {
    if (count === AsyncRetryPlayer.MAX_RETRY_STACK_COUNT) return;
    await this.#mainClass.run();
    const retryChecker = await retryWhenErrorOccurs(
      this.#readRetryChecker.bind(this)
    );
    if (!this.#isRetryYes(retryChecker)) return;
    this.recursiveRetry(count + 1);
  }

  async #readRetryChecker() {
    const retryCheck = await this.#inputView.readRetryChecker();
    this.#validateRetryChecker(retryCheck);

    return retryCheck;
  }

  #validateRetryChecker(string) {
    const RETRY_OPTION = [...this.#RETRY_YES, ...this.#RETRY_NO];

    if (!RETRY_OPTION.includes(string)) {
      throw new Error(MESSAGES.ERROR.invalidRetryChecker);
    }
  }

  #isRetryYes(retryChecker) {
    return this.#RETRY_YES.includes(retryChecker);
  }
}

export default AsyncRetryPlayer;
