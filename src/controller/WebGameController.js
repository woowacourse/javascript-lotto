import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import setupModalControl from '../setupModalControl.js';
import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import { disableButton } from '../util/web/buttonState.js';
import { showModal } from '../util/web/modal.js';
import { $ } from '../util/web/selector.js';
import validatePrice from '../validation/validatePrice.js';
import { resetError, showError } from '../view/web/errorUI.js';
import { getPriceInput, getWinningNumbers } from '../view/web/InputView.js';
import { showWinningNumberForm, updatePurchaseView, updateMatchingResult } from '../view/web/OutputView.js';
import { resetUI } from '../view/web/resetUI.js';

class WebGameController {
  constructor() {
    this.lottoArray = [];
  }

  handlePurchase(event) {
    event.preventDefault();

    try {
      const priceValue = getPriceInput();
      validatePrice(priceValue);

      const { lottoArray, lottoCount } = purchaseLottos(priceValue);
      this.lottoArray = lottoArray;

      updatePurchaseView(lottoCount, lottoArray);
      disableButton($('.purchase - form__button'));
    } catch (error) {
      showError($('.purchase-form__error-message'), error.message);
      showWinningNumberForm(false);
    }
  }

  handleWinningSubmit(event) {
    event.preventDefault();

    try {
      resetError('.winning-form__error-message');
      const { winningNumbers, bonusNumber } = getWinningNumbers();

      const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
      const matchingResult = calculateMatchingResult(winningLotto, this.lottoArray);
      const profitRate = calculateProfitRate(matchingResult, this.lottoArray.length);

      updateMatchingResult(matchingResult, profitRate);
      showModal($('.modal'));
      setupModalControl();
    } catch (error) {
      showError('.winning-form__error-message', error.message);
    }
  }

  handleRestartGame() {
    resetUI();
    this.lottoArray = [];
  }
}

export default WebGameController;
