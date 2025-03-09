import { parsePrice } from '../input/parseInput.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import validatePrice from '../validation/validatePrice.js';
import { resetError, showError } from '../view/web/errorUI.js';
import { disableButton } from '../view/web/buttonState.js';
import { $ } from '../util/web/selector.js';
import { showLottoCount } from './view/showLottoCount.js';
import { showLottoTickets } from './view/showLottoTickets.js';
import showWinningNumberForm from './view/showWinningNumberForm.js';

export const submitPurchaseForm = () => {
  return new Promise((resolve) => {
    $('.purchase-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const { lottoArray, lottoCount } = handleLottoPurchase();

      disableButton('.purchase-form__button');

      showLottoCount(lottoCount);
      showLottoTickets(lottoArray);

      showWinningNumberForm(true);
      return resolve(lottoArray);
    });
  });
};

const handleLottoPurchase = () => {
  const priceInput = $('#price');
  const errorUI = $('.purchase-form__error-message');
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
