import LottoListView from './view/LottoList';
import PurchaseFormView from './view/PurchaseForm';
import WinningNumbersFormView from './view/WinningNumbersForm';
import ResultModalView from './view/ResultModal';

import LottoUser from './model/lottoUser';

import { $ } from './utils/dom';
import { LOTTO_PRICE, ID_SELECTOR, ERROR_MESSAGE } from './constants';
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
      alert(ERROR_MESSAGE[message] || ERROR_MESSAGE.UNKNOWN_ERROR);
    }
  }

  #sumbitWinningNumberHandler(reuglarNumbers, bonusNumber) {
    try {
      validateWinningNumbers(reuglarNumbers, bonusNumber);
      this.#lottoUser.setLottoResult(reuglarNumbers, bonusNumber);
      this.#resultModalView.renderLottoResult(
        this.#lottoUser.getLottoStatus(),
        this.#lottoUser.getProfitRate(),
      );
    } catch ({ message }) {
      alert(ERROR_MESSAGE[message] || ERROR_MESSAGE.UNKNOWN_ERROR);
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
