import { parsePrice } from '../input/parseInput.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import validatePrice from '../validation/validatePrice.js';
import { $ } from '../util/selector.js';

import { updateLottoUI } from './updateLottoUI.js';
import { resetError } from './errorHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  $('#purchase-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const priceInput = $('#price');
    const errorMessage = $('.error-message');
    const winningNumberForm = $('#winning-number-form');

    const priceValue = priceInput.value.trim();

    resetError(priceInput, errorMessage);
    try {
      validatePrice(priceValue);
      const price = parsePrice(priceValue);
      const { lottoArray, lottoCount } = purchaseLottos(price);
      updateLottoUI(lottoArray, lottoCount);
      winningNumberForm.style.display = 'block';
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.visibility = 'visible';
      priceInput.classList.add('error');
    }
  });
});
