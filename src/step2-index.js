/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

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
  getUIWinningNumber,
} from './service/InputService.js';
import {
  getBonusNumber,
  getPurchasePrice,
  getWinningNumber,
} from './service/ParsingService.js';
import showLottoResult from './showLottoResult.js';
import showPurchaseResult from './showPurchaseResult.js';

document.addEventListener('DOMContentLoaded', () => {
  const purchaseButton = document.getElementById('purchase-button');
  let lottos = [];
  purchaseButton.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const { purchasePrice, purchaseAmount } = await getPurchasePrice(
        getUIPurchasePrice,
        getUIPurchasePrice,
      );

      showPurchaseResult(purchaseAmount);

      showLottoResult(lottos, purchaseAmount, purchaseButton);

      createLottoInput();

      const resultButton = document.getElementById('check-result-btn');

      resultButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const userLotto = await getWinningNumber(getUIWinningNumber);
        const parsedLotto = await getBonusNumber(userLotto, getUIBonusNumber);

        const winCount = calculateWins(lottos, parsedLotto);
        const total = calculatePrize(winCount, PRIZE_MONEY);
        const revenueRate = calculateRevenueRate(total, purchasePrice);
        resultButton.disabled = true;

        const modalOverlay = createModalOverlay();

        const modal = createModal(winCount, revenueRate, modalOverlay);
        const closeButton = document.getElementById('close-button');
        closeButton.addEventListener('click', () => {
          event.preventDefault();
          modal.remove();
          modalOverlay.remove();
          document.querySelector('.lotto-content').remove();
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
});
