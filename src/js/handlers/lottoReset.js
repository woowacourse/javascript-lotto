import { lotto } from '../model/lotto.js';
import { $, removeDOM, resetForm } from '../lib/utils/dom.js';
import { closeModal } from '../lib/utils/modal.js';

const clearLottoApp = () => {
  $('#ticket-list').innerHTML = '';
  $('#ticket-count').innerHTML = '';

  $('input[name=payment-input]').disabled = false;
  $('button[name=payment-button]').disabled = false;

  resetForm([
    '#payment-form',
    '#manual-purchase-form',
    '#manual-number-form',
    '#auto-purchase-form',
    '#winning-number-form',
  ]);

  removeDOM([
    '#manual-purchase-form',
    '#manual-number-form',
    '#auto-purchase-form',
    '#winning-number-form',
  ]);

  $('#toggle-detail-mode').classList.add('hide');
  $('input[name=payment-input]').focus();
  $('#remaining-money').innerHTML = '0';
};

const lottoResetHandler = () => {
  lotto.tickets = [];
  clearLottoApp();
  closeModal();
};

export default lottoResetHandler;
