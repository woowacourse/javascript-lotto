import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import { $ } from '../util/web/selector.js';
import validatePrice from '../validation/validatePrice.js';
import { resetError, showError } from '../view/web/errorUI.js';
import { getPriceInput, getWinningNumbers } from '../view/web/InputView.js';
import { showWinningNumberForm, updatePurchaseView, updateMatchingResult } from '../view/web/OutputView.js';
import { resetUI } from '../view/web/resetUI.js';
import { parseBonusNumber, parsePrice, parseWinningNumber } from '../input/parseInput.js';
import { setupModalControl, showModal } from '../view/web/ModalView.js';
import { disableButton } from '../view/web/buttonState.js';
import validateWinningNumber from '../validation/validateWinningNumber.js';
import validateBonusNumber from '../validation/validateBonusNumber.js';

class WebGameController {
  constructor() {
    this.lottoArray = [];
  }

  handlePurchase(event) {
    event.preventDefault();
    resetError($('.purchase-form__error-message'));

    const price = this.getValidatedPrice();
    if (!price) return;

    showWinningNumberForm(true);
    this.updateLottoState(price);
  }

  getValidatedPrice() {
    try {
      const priceValue = getPriceInput();
      validatePrice(priceValue);
      return parsePrice(priceValue);
    } catch (error) {
      showError($('.purchase-form__error-message'), error.message);
      showWinningNumberForm(false);
      return null;
    }
  }

  updateLottoState(price) {
    const { lottoArray, lottoCount } = purchaseLottos(price);
    this.lottoArray = lottoArray;

    updatePurchaseView(lottoCount, lottoArray);
    disableButton($('.purchase-form__button'));
  }

  handleWinningSubmit(event) {
    event.preventDefault();
    resetError($('.winning-form__error-message'));

    const { winningNumbers, bonusNumber } = this.getValidatedWinningNumber();
    if (!winningNumbers || !bonusNumber) return;

    this.updateWinningState(winningNumbers, bonusNumber);
  }

  getValidatedWinningNumber() {
    try {
      const { winningNumberInput, bonusNumberInput } = getWinningNumbers();

      validateWinningNumber(winningNumberInput);
      const winningNumbers = parseWinningNumber(winningNumberInput);

      validateBonusNumber(winningNumbers, bonusNumberInput);
      const bonusNumber = parseBonusNumber(bonusNumberInput);

      return { winningNumbers, bonusNumber };
    } catch (error) {
      showError($('.winning-form__error-message'), error.message);
      return null;
    }
  }

  updateWinningState(winningNumbers, bonusNumber) {
    const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
    const matchingResult = calculateMatchingResult(winningLotto, this.lottoArray);
    const profitRate = calculateProfitRate(matchingResult, this.lottoArray.length);

    updateMatchingResult(matchingResult, profitRate);
    showModal($('.modal'));
    setupModalControl();
  }

  handleRestartGame() {
    resetUI();
    this.lottoArray = [];
  }
}

export default WebGameController;
