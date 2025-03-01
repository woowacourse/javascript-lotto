import { parsePrice } from '../../input/parseInput.js';
import { purchaseLottos } from '../../service/PurchaseService.js';
import { $ } from '../../util/selector.js';
import validatePrice from '../../validation/validatePrice.js';
import { resetError, showError } from '../errorHandler.js';
import disablePurchaseButton from './disabledPurchaseButton.js';
import { updateLottoUI } from './updateLottoUI.js';

export const submitPurchaseForm = () => {
  return new Promise((resolve) => {
    $('#purchase-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const { lottoArray, lottoCount } = handleLottoPurchase();

      disablePurchaseButton();
      updateLottoUI(lottoArray, lottoCount);

      showWinningNumberForm(true);
      return resolve(lottoArray);
    });
  });
};

const handleLottoPurchase = () => {
  const priceInput = $('#price');
  const errorUI = $('#price-error');
  resetError(errorUI);

  try {
    const priceValue = priceInput.value.trim();
    validatePrice(priceValue);
    const price = parsePrice(priceValue);
    return purchaseLottos(price);
  } catch (error) {
    showError(errorUI, error.message);
    showWinningNumberForm(false);
  }
};

const showWinningNumberForm = (isValid) => {
  const winningNumberForm = $('#winning-number-form');
  winningNumberForm.style.display = isValid ? 'block' : 'none';
};
