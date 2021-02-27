import { $, $$ } from '../utils/querySelector.js';
import { closeModal } from '../utils/setProperty.js';
import { initializePurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { hideWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';

const restartLottoGame = (lotto) => {
  $('#purchase-price-input-form__input').value = '';
  $$('.winning-number').forEach((winningNumberInput) => {
    winningNumberInput.value = '';
  });
  $('.bonus-number').value = '';

  lotto.initialize();
  hideWinningNumberInputForm();
  initializePurchaseResultSection();
  closeModal($('#result-modal'));
};

export const handleResultModal = ({ target }, lotto) => {
  if (target.classList.contains('result-modal__close-button')) {
    closeModal($('#result-modal'));
    return;
  }

  if (target.classList.contains('result-modal__restart-button')) {
    restartLottoGame(lotto);
  }
};
