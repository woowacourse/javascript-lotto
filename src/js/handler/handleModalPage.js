import Lotto from '../model/Lotto.js';
import { $, $$ } from '../utils/querySelector.js';
import { closeModal } from '../view/viewModalPage.js';
import { initializePurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { hideWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';

const initializeLottoModel = (lotto) => {
  lotto.tickets = [];
  lotto.purchasePrice = 0;
  lotto.totalProfit = 0;
};

const restartLottoGame = (lotto) => {
  $('#purchase-price-input-form__input').value = '';
  $$('.winning-number').forEach((winningNumberInput) => {
    winningNumberInput.value = '';
  });
  $('.bonus-number').value = '';

  initializeLottoModel(lotto);
  hideWinningNumberInputForm();
  initializePurchaseResultSection();
  closeModal();
};

export const handleModalPage = ({ target }, lotto) => {
  if (target.classList.contains('close-button')) {
    closeModal();
    return;
  }
  if (target.classList.contains('restart-button')) {
    restartLottoGame(lotto);
  }
};
