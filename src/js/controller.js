import LottoListView from './view/LottoList.js';
import PurchaseFormView from './view/PurchaseForm.js';
import WinningNumbersFormView from './view/WinningNumbersForm.js';
import ResultModalView from './view/ResultModal.js';

import LottoUser from './model/lottoUser.js';

import { $ } from './utils/dom.js';
import { LOTTO_PRICE, ID_SELECTOR } from './constants.js';
import { validateCashInput, validateWinningNumbers } from './utils/validation';

export default class Controller {
  #lottoUser = new LottoUser();

  #purchaseFormView = new PurchaseFormView($(ID_SELECTOR.PURCHASE_FORM), {
    submitCashHandler: cash => this.#submitCashHanlder(cash),
  });
  #lottoListView = new LottoListView($(ID_SELECTOR.LOTTO_LIST_SECTION));
  #winningNumbersFormView = new WinningNumbersFormView($(ID_SELECTOR.WINNING_NUMBERS_SECTION), {
    submitWinningNumbersHandler: (reuglarNumbers, bonusNumber) =>
      this.#sumbitWinningNumberHandler(reuglarNumbers, bonusNumber),
  });
  #resultModalView = new ResultModalView($(ID_SELECTOR.MODAL_CONTAINER), {
    clickRestart: () => this.#restartHandler(),
  });

  #submitCashHanlder(cash) {
    try {
      validateCashInput(cash);
      this.#lottoUser.buyLotto(cash / LOTTO_PRICE);
      this.#lottoListView.renderLottoListSection(this.#lottoUser.getBuyedLottos());
      this.#winningNumbersFormView.show();
    } catch ({ message }) {
      alert(message);
    }
  }

  #sumbitWinningNumberHandler(reuglarNumbers, bonusNumber) {
    try {
      validateWinningNumbers(reuglarNumbers, bonusNumber);
      this.#lottoUser.setLottoResult(reuglarNumbers, bonusNumber);
      this.#resultModalView.showLottoResult(
        this.#lottoUser.getLottoStatus(),
        this.#lottoUser.getProfitRate(),
      );
    } catch ({ message }) {
      alert(message);
    }
  }

  #restartHandler() {
    this.#purchaseFormView.clearInput();
    this.#lottoListView.hide();
    this.#winningNumbersFormView.hide();
    this.#resultModalView.hide();
    this.#lottoUser.reset();
  }
}
