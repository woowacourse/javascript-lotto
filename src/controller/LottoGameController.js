import InputView from "../view/InputView.js";
import BudgetValidation from "../validation/budgetValidation.js";
import getValidInput from "../utils/getValidInput.js";

class LottoGameController {
  #budget;

  constructor() {
    this.#initBudget();
  }

  async #initBudget() {
    const budgetInput = await getValidInput(InputView.readBudget);
  }
}

export default LottoGameController;
