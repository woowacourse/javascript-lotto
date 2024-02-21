import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import getValidInput from "../utils/getValidInput.js";

class LottoGameController {
  #budget;

  constructor() {}

  async #initBudget() {
    const budgetInput = await getValidInput(InputView.readBudget);
    this.#budget = Number(budgetInput);
  }

  #calculateLottoCount() {
    return this.#budget / 1000;
  }

  #printLottoCount() {
    OutputView.printLottoCount(this.#calculateLottoCount());
  }

  async play() {
    await this.#initBudget();
    this.#printLottoCount();
  }
}

export default LottoGameController;
