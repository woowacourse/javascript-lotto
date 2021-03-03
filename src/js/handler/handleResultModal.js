import { $, $$ } from '../utils/querySelector.js';
import { clearSelfResultTable } from '../view/viewPurchaseModal.js';
import { initializePurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { closeResultModal } from '../view/viewResultModal.js';
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
  clearSelfResultTable();
  closeResultModal();
};

export const handleResultModal = ({ target }, lotto) => {
  if (target.classList.contains('result-modal__close-button')) {
    closeResultModal();
    return;
  }

  if (target.classList.contains('result-modal__restart-button')) {
    restartLottoGame(lotto);
  }
};
