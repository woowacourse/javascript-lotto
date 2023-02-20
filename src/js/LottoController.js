import { $ } from './util/querySelector.js';
import PurchaseView from './view/PurchaseView.js';
import ErrorView from './view/ErrorView.js';
import LottoGame from './domain/LottoGame.js';
import validator from './domain/validator.js';

class LottoController {
  #lottoGame;
  #purchaseView = new PurchaseView((budget) => this.handleBudget(budget));

  handleBudget(budget) {
    this.#lottoGame = new LottoGame(budget);
    this.#purchaseView.render(this.#lottoGame.getBoughtLottos());
    this.#showErrorIfInvalidBudget(budget);
  }
}

export default LottoController;
