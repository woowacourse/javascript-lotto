import LottoGame from './LottoGame.js';
import PurchaseView from '../view/PurchaseView.js';
import LottoListView from '../view/LottoListView.js';
import WinningNumbersView from '../view/WinningNumbersView.js';
import ModalView from '../view/ModalView.js';
import Validation from './Vaildation.js';
import { LOTTO_CONDITION } from '../constants/condition.js';

export default class LottoGameController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
    this.purchaseView = new PurchaseView();
    this.lottoListView = new LottoListView();
    this.winningNumbersView = new WinningNumbersView();
    this.modalView = new ModalView();
  }

  listenViewEvents() {
    this.purchaseView.$purchaseAmountForm.addEventListener('purchase', (e) =>
      this.#getPurchaseAmount(e.detail)
    );
    this.winningNumbersView.$winningLottoForm.addEventListener('check', (e) =>
      this.#getWinningLottos(e.detail.winningNumbers, e.detail.bonusNumber)
    );
    this.modalView.$retryButton.addEventListener('retry', () => {
      this.#processRestart();
    });
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

        return lottoNumbers;
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

  #getWinningLottos(winningNumbers, bonusNumber) {
    this.#compareLotto(winningNumbers, bonusNumber);
  }

  #compareLotto(winningNumbers, bonusNumber) {
    try {
      Validation.validateWinningNumbers(winningNumbers);
      Validation.validateBonusNumber(bonusNumber, winningNumbers);

      const eachCompareResult = this.#lottoGame.getEachCompareResult(winningNumbers, bonusNumber);
      const statistics = this.#lottoGame.getStatistics(eachCompareResult);
      const totalPrizeMoney = this.#lottoGame.getTotalPrizeMoney(statistics);
      const yieldRatio = this.#lottoGame.getYieldRatio(totalPrizeMoney);

      this.modalView.renderModal(statistics, yieldRatio);

      return;
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
        this.winningNumbersView.reloadView();
      }

      window.alert(error);
      return;
    }
  }

  #processRestart() {
    this.#lottoGame.resetLottoGame();
    this.purchaseView.reloadView();
    this.lottoListView.reloadView();
    this.winningNumbersView.hideWinningNumbers();
    this.winningNumbersView.reloadView();
    this.modalView.closeModal();
  }
}
