import LottoData from './lottoData';
import LottoListView from './view/LottoList.js';
import PurchaseFormView from './view/PurchaseForm.js';
import WinningNumbersFormView from './view/WinningNumbersForm.js';
import { LOTTO_PRICE } from './constants.js';
import { validateCashInput, validateWinningNumbers } from './utils/validation';

export default class Controller {
  #lottoData = new LottoData();
  #purchaseFormView = new PurchaseFormView({
    submitCashHandler: cash => this.#submitCashHanlder(cash),
  });
  #lottoListView = new LottoListView();
  #winningNumbersFormView = new WinningNumbersFormView({
    submitWinningNumbersHandler: (reuglarNumbers, bonusNumber) =>
      this.#sumbitWinningNumberHandler(reuglarNumbers, bonusNumber),
  });

  #submitCashHanlder(cash) {
    try {
      validateCashInput(cash);
      this.#lottoData.buyLotto(cash / LOTTO_PRICE);
      this.#lottoListView.showLottoListSection(this.#lottoData.getLottoList());
      this.#winningNumbersFormView.showWinningNumbersSection();
    } catch ({ message }) {
      alert(message);
    }
  }

  #sumbitWinningNumberHandler(reuglarNumbers, bonusNumber) {
    try {
      validateWinningNumbers(reuglarNumbers, bonusNumber);
    } catch ({ message }) {
      alert(message);
    }
  }
}
