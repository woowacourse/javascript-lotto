/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import clearUIElements from './clearUIElements.js';
import { PRIZE_MONEY } from './constants/MagicNumber.js';
import createLottoInput from './createLottoInput.js';
import createModal from './createModal.js';
import createModalOverlay from './createModalOverlay.js';
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
import showLottoResult from './showLottoResult.js';
import showPurchaseResult from './showPurchaseResult.js';

document.addEventListener('DOMContentLoaded', () => {
  const purchaseButton = document.getElementById('purchase-button');
  let lottos = [];
  let purchasePrice = 0;
  async function handlePurchase(event) {
    event.preventDefault();
    try {
      const { purchasePrice: price, purchaseAmount } = await getPurchasePrice(
        getUIPurchasePrice,
      );
      purchasePrice = price;

      showPurchaseResult(purchaseAmount);
      purchaseButton.disabled = true;
      lottos = showLottoResult(lottos, purchaseAmount, purchaseButton);
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

    const userLotto = await getWinningNumber(getUIWinningNumber);
    const parsedLotto = await getBonusNumber(userLotto, getUIBonusNumber);

    let winCount = 0;

    winCount = calculateWins(lottos, parsedLotto);
    const total = calculatePrize(winCount, PRIZE_MONEY);
    const revenueRate = calculateRevenueRate(total, purchasePrice);

    const modalOverlay = createModalOverlay();
    const modal = createModal(winCount, revenueRate, modalOverlay);
    const closeButton = document.getElementById('close-button');

    const userRetry = await getUserRetry(getUIUserRetry);

    if (userRetry === 'y') {
      lottos = [];
      modal.remove();
      modalOverlay.remove();
      clearUIElements();
      purchaseButton.disabled = false;
      document.querySelector('.lotto-content').innerHTML = '';
    }

    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      modal.remove();
      modalOverlay.remove();
      document.querySelector('.lotto-content').innerHTML = '';
    });
  }

  purchaseButton.removeEventListener('click', handlePurchase);
  purchaseButton.addEventListener('click', handlePurchase);
});
