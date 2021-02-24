import { $ } from '../utils/querySelector.js';
import { closeModal } from '../view/viewModalPage.js';
import { restartLottoGame } from './handleModalPage.js';

export const handleAccessbiliy = ({ key }, lotto) => {
  if (!$('.modal').classList.contains('open')) {
    return;
  }

  if (key === 'Escape') {
    closeModal();
    return;
  }

  if (key === ' ') {
    restartLottoGame();
    lotto.clear();
    closeModal();
    $('#purchase-price-input-form__input').focus();
  }
};
