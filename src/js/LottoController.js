import { $ } from './util/querySelector.js';
import PurchaseView from './view/PurchaseView.js';
import ErrorView from './view/ErrorView.js';
import LottoGame from './domain/LottoGame.js';
import validator from './domain/validator.js';

class LottoController {
  #lottoGame;
  #purchaseView = new PurchaseView((budget) => this.handleBudget(budget));

  handleBudget(budget) {
    const budgetErrorView = new ErrorView($('#buyErrorArea'), $('#budgetInput'));

    try {
      validator.throwErrorIfInvalidBudget(budget);
      budgetErrorView.hideErrorMessage();
      this.#lottoGame = new LottoGame(budget);
      this.#purchaseView.render(this.#lottoGame.getBoughtLottos());
    } catch ({ message }) {
      budgetErrorView.renderErrorMessage(message);
    }
  }
}

export default LottoController;
