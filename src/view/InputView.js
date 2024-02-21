import readLineAsync from "../utils/readLineAsync.js";
import VIEW_MESSAGE from "../constants/viewMessage.js";
import BudgetValidation from "../validation/budgetValidation.js";
import startValidation from "../validation/startValidation.js";

const InputView = {
  async readBudget() {
    const budgetInput = await readLineAsync(VIEW_MESSAGE.budget);
    startValidation(Number(budgetInput));
    return budgetInput;
  },
};

export default InputView;
