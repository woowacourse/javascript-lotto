import { parsePrice } from '../input/parseInput.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import validatePrice from '../validation/validatePrice.js';
import { resetError, showError } from './util/errorHandler.js';
import disableButton from './util/disabledButton.js';
import { $ } from '../util/selector.js';
import { showLottoCount } from './view/showLottoCount.js';
import { showLottoTickets } from './view/showLottoTickets.js';

export const submitPurchaseForm = () => {
  return new Promise((resolve) => {
    $('#purchase-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const { lottoArray, lottoCount } = handleLottoPurchase();

      disableButton($('#purchase-form button'));

      showLottoCount(lottoCount);
      showLottoTickets(lottoArray);

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
