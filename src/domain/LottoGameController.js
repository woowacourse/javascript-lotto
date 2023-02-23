import Validation from './Vaildation.js';
import LottoGame from './LottoGame.js';
import { LOTTO_CONDITION } from '../constants/condition.js';
import PurchaseView from '../view/PurchaseView.js';

export default class LottoGameController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
    this.purchaseView = new PurchaseView();
  }

  listenViewEvents() {
    this.purchaseView.$purchaseAmountForm.addEventListener('purchase', (e) =>
      this.#getPurchaseAmount(e.detail)
    );
  }

  #getPurchaseAmount(purchaseAmount) {
    this.#lottoGame.resetLottoGame();
    this.#createLotto(purchaseAmount);
  }

  #createLotto(purchaseAmount) {
    try {
      Validation.validatePurchaseAmount(purchaseAmount);

      const lottoQuantity = purchaseAmount / LOTTO_CONDITION.lottoPrice;
      const eachLottoNumbers = Array.from({ length: lottoQuantity }, () => {
        const lottoNumbers = this.#lottoGame.generateLottoNumbers(LOTTO_CONDITION.lottoDigits);

        this.#lottoGame.makeLotto(lottoNumbers);

        return;
      });
      this.#onValidPurchaseAmount(lottoQuantity, eachLottoNumbers);

      return;
    } catch (error) {
      if (error instanceof Error) {
        this.#onInValidPurchaseAmount(error.message);

        return;
      }

      return window.alert(error);
    }
  }

  #onValidPurchaseAmount(lottoQuantity, eachLottoNumbers) {
    this.purchaseView.hideErrorMessage();
    this.lottoListView.renderLottoList(lottoQuantity, eachLottoNumbers);
    this.winningNumbersView.showWinningNumbers();
    this.winningNumbersView.enableResultButton();
  }

  #onInValidPurchaseAmount(message) {
    this.purchaseView.printErrorMessage(message);
    this.purchaseView.reloadView();
    this.winningNumbersView.disableResultButton();
  }
}
