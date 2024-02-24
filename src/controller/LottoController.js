import LottoResultMaker from "../domain/LottoResultMaker.js";
import InputView from "../view/InputVIew.js";
import OutputView from "../view/OutputView.js";

import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs.js";

import MESSAGES from "../view/constants/messages.js";
import LottoInputController from "./LottoInputController.js";
import LottoOutputController from "./LottoOutputController.js";

class LottoController {
  #RETRY_YES = ["y", "Y"];
  #RETRY_NO = ["n", "N"];
  #outputController;
  #inputController;

  constructor(outputView = OutputView, inputView = InputView) {
    this.#outputController = new LottoOutputController(outputView);
    this.#inputController = new LottoInputController(inputView, outputView);
  }

  async start() {
    while (true) {
      await this.#play();
      const retryChecker = await retryWhenErrorOccurs(
        this.#readRetryChecker.bind(this)
      );
      if (!this.#isRetryYes(retryChecker)) return;
      OutputView.printBlankLine();
    }
  }

  async #play() {
    const lottos = await this.#inputController.readLottos();

    this.#outputController.printBoughtLottos(lottos);

    const lottoBoard = await this.#inputController.readLottoBoard();
    const lottoResult = LottoResultMaker.getLottoResult(lottos, lottoBoard);

    this.#outputController.printLottoResult(lottoResult);
  }

  async #readRetryChecker() {
    const retryCheck = await InputView.readRetryChecker();
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

export default LottoController;
