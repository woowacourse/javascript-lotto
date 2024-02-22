import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import getValidInput from "../utils/getValidInput.js";
import randomLottoArray from "../domain/randomLottoMaker.js";

class LottoGameController {
  #budget;
  #winningLotto = {};

  constructor() {}

  async #initBudget() {
    const budget = await getValidInput(InputView.readBudget);
    this.#budget = Number(budget); // TODO
  }

  async #initWinningLotto() {
    const winningLotto = await getValidInput(InputView.readWinningLottoNumbers);
    this.#winningLotto["normalNumbers"] = winningLotto;
  }

  async #initWinningLottoBonus() {
    const winningLottoBonus = await getValidInput(() =>
      InputView.readWinningLottoBonus(this.#winningLotto["normalNumbers"]),
    );
    this.#winningLotto["bonusNumber"] = winningLottoBonus;
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
    await this.#initWinningLotto();
    await this.#initWinningLottoBonus();
  }

  #printIssuedLottos() {
    OutputView.printIssuedLottoArray(randomLottoArray(this.#calculateLottoCount()));
  }
}

export default LottoGameController;
