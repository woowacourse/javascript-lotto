import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import getValidInput from "../utils/getValidInput.js";
import randomLottoArray from "../domain/randomLottoMaker.js";

class LottoGameController {
  #budget;

  constructor() {}

  async #initBudget() {
    const budgetInput = await getValidInput(InputView.readBudget);
    this.#budget = Number(budgetInput);
  }

  async #initWinningLottoNumbers() {
    // 함수명 임시 이름임
    const t = await getValidInput(InputView.readWinningLottoNumbers);
    console.log(t);
    //this.#budget = Number(budgetInput);
    return t;
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
    this.#printIssuedLottos();
    await this.#inittest();
  }

  async #inittest() {
    const t = await getValidInput(InputView.readWinningLottoNumbers);
    console.log(t);
    //this.#budget = Number(budgetInput);
    return t;
  }

  #printIssuedLottos() {
    OutputView.printIssuedLottoArray(randomLottoArray(this.#calculateLottoCount()));
  }
}

export default LottoGameController;
