import { $, $$ } from '../utils/querySelector.js';
import { closeModal } from '../view/viewModalPage.js';
import { hidePurchaseSection } from '../view/viewPurchaseSection.js';
import { hideWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';
import { initializePurchaseResultSection } from '../view/viewPurchaseResultSection.js';

export const restartLottoGame = () => {
  $('#purchase-price-input-form__input').value = '';
  $$('.winning-number').forEach((winningNumberInput) => {
    winningNumberInput.value = '';
  });
  $('.bonus-number').value = '';

  hidePurchaseSection();
  hideWinningNumberInputForm();
  initializePurchaseResultSection();
};

export const handleModalPage = ({ target }, lotto) => {
  if (target.classList.contains('close-button')) {
    closeModal();
    return;
  }

  if (target.classList.contains('restart-button')) {
    restartLottoGame(lotto);
    lotto.clear();
    closeModal();
  }
};
