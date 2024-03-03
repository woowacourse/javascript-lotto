import BudgetController from "./BudgetController.js";
import IssuedLottoController from "./IssuedLottoController.js";
import WinningLottoController from "./WinningLottoController.js";

class MainController {
  #budgetController = null;
  #issuedLottoController = null;

  constructor() {
    this.#setBudget();
  }

  #setBudget() {
    this.#budgetController = new BudgetController(
      this.#playLottoGame.bind(this)
    );
  }

  #playLottoGame() {
    // 로또 발행
    this.#issuedLottoController = new IssuedLottoController(
      this.#budgetController.getLottoCount()
    );
  }
}

export default MainController;
