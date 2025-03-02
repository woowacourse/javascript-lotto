import clearUIElements from './View/clear/clearUIElements.js';
import { PRIZE_MONEY } from './constants/MagicNumber.js';
import createLottoInput from './View/create/createLottoInput.js';
import createModal from './View/create/createModal.js';
import createModalOverlay from './View/create/createModalOverlay.js';
import {
  calculatePrize,
  calculateRevenueRate,
  calculateWins,
} from './service/CalculatorService.js';
import {
  getUIBonusNumber,
  getUIPurchasePrice,
  getUIUserRetry,
  getUIWinningNumber,
} from './service/InputService.js';
import makeLotto from './service/LottoService.js';
import {
  getBonusNumber,
  getPurchasePrice,
  getUserRetry,
  getWinningNumber,
} from './service/ParsingService.js';
import showLottoResult from './View/show/showLottoResult.js';
import showPurchaseResult from './View/show/showPurchaseResult.js';
import {
  lottoInputErrorHandler,
  priceErrorHandler,
} from './util/errorHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const purchaseButton = document.getElementById('purchase-button');
  let lottos = [];
  let purchasePrice = 0;
  async function handlePurchase(event) {
    event.preventDefault();
    try {
      const { purchasePrice: price, purchaseAmount } = await getPurchasePrice(
        getUIPurchasePrice,
        priceErrorHandler,
      );
      purchasePrice = price;
      showPurchaseResult(purchaseAmount);
      purchaseButton.disabled = true;

      lottos = makeLotto(purchaseAmount);
      showLottoResult(lottos);
      createLottoInput();

      const resultButton = document.getElementById('check-result-btn');
      resultButton.removeEventListener('click', handleResult);
      resultButton.addEventListener('click', handleResult);
      return purchasePrice;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleResult(event) {
    event.preventDefault();
    try {
      const userLotto = await getWinningNumber(
        getUIWinningNumber,
        lottoInputErrorHandler,
      );
      const parsedLotto = await getBonusNumber(
        userLotto,
        getUIBonusNumber,
        lottoInputErrorHandler,
      );

      let winCount = 0;
      winCount = calculateWins(lottos, parsedLotto);
      const total = calculatePrize(winCount, PRIZE_MONEY);
      const revenueRate = calculateRevenueRate(total, purchasePrice);

      const modalOverlay = createModalOverlay();
      const modal = createModal(winCount, revenueRate, modalOverlay);
      const closeButton = document.getElementById('close-button');

      closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        lottos = [];
        modal.remove();
        modalOverlay.remove();
        clearUIElements();
        purchaseButton.disabled = false;
        document.querySelector('.lotto-content').innerHTML = '';
      });

      const userRetry = await getUserRetry(getUIUserRetry);

      if (userRetry === 'y') {
        lottos = [];
        modal.remove();
        modalOverlay.remove();
        clearUIElements();
        purchaseButton.disabled = false;
        document.querySelector('.lotto-content').innerHTML = '';
      }
    } catch (error) {
      console.log(error);
    }
  }

  purchaseButton.removeEventListener('click', handlePurchase);
  purchaseButton.addEventListener('click', handlePurchase);
});
