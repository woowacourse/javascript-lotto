import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs";

import MESSAGES from "../view/constants/messages";

class RetryPlayer {
  static MAX_RETRY_STACK_COUNT = 100;

  #RETRY_YES = ["y", "Y"];

  #RETRY_NO = ["n", "N"];

  #inputView;

  constructor(inputView) {
    this.#inputView = inputView;
  }

  async asyncStart(asyncFunction) {
    while (await this.#checkRetry(asyncFunction));
  }

  async #checkRetry(asyncFunction, ...args) {
    await asyncFunction(...args);
    const retryChecker = await retryWhenErrorOccurs(
      this.#readRetryChecker.bind(this)
    );
    if (this.#isRetryYes(retryChecker)) return true;
    return false;
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

export default RetryPlayer;
