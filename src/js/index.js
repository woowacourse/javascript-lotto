import { parseBonusNumber, parsePrice, parseWinningNumber } from '../input/parseInput.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import validatePrice from '../validation/validatePrice.js';
import { $, $all } from '../util/selector.js';

import { updateLottoUI } from './updateLottoUI.js';
import { resetError } from './errorHandler.js';
import validateWinningNumber from '../validation/validateWinningNumber.js';
import validateBonusNumber from '../validation/validateBonusNumber.js';

document.addEventListener('DOMContentLoaded', () => {
  $('#purchase-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const priceInput = $('#price');
    const errorUI = $('#price-error');
    const winningNumberForm = $('#winning-number-form');

    const priceValue = priceInput.value.trim();

    resetError(priceInput, errorUI);
    try {
      validatePrice(priceValue);
      const price = parsePrice(priceValue);
      const { lottoArray, lottoCount } = purchaseLottos(price);
      updateLottoUI(lottoArray, lottoCount);
      // winningNumberForm.style.display = 'block';
    } catch (error) {
      errorUI.textContent = error.message;
      errorUI.style.visibility = 'visible';
      priceInput.classList.add('error');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  $('#winning-number-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const errorUI = $('#winning-number-error');
    try {
      const { winningNumbers, bonusNumber } = getWinningNumbers();
      console.log('당첨 번호:', winningNumbers, '보너스 번호:', bonusNumber);
    } catch (error) {
      errorUI.textContent = error.message;
      errorUI.style.visibility = 'visible';
      priceInput.classList.add('error');
    }
  });
});

const getWinningNumbers = () => {
  // 모든 당첨번호 input 값을 가져와 배열로 변환 후 ", "로 연결
  const winningNumberInput = Array.from($all('.winning-number-boxes input'))
    .map((input) => input.value.trim())
    .filter((value) => value !== ''); // 공백 제거

  const bonusNumberInput = $('#bonus').value.trim();

  validateWinningNumber(winningNumberInput);
  const winningNumbers = parseWinningNumber(winningNumberInput);

  validateBonusNumber(winningNumbers, bonusNumberInput);
  const bonusNumber = parseBonusNumber(bonusNumberInput);

  return { winningNumbers, bonusNumber };
};
