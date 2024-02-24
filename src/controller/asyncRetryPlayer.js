import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs";

class AsyncRetryPlayer {
  #RETRY_YES = ["y", "Y"];
  #RETRY_NO = ["n", "N"];

  #mainClass;
  #inputView;

  constructor(mainClass, inputView) {
    this.#mainClass = mainClass;
    this.#inputView = inputView;
  }

  async start() {
    while (true) {
      await this.#mainClass.run();
      const retryChecker = await retryWhenErrorOccurs(
        this.#readRetryChecker.bind(this)
      );
      if (!this.#isRetryYes(retryChecker)) return;
    }
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
