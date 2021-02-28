import { lotto } from '../model/lotto.js';
import { $, removeDOM, resetForm } from '../lib/utils/dom.js';
import { closeModal } from '../lib/utils/modal.js';

const clearLottoApp = () => {
  const manualArray = [
    '#payment-form',
    '#manual-purchase-form',
    '#manual-number-form',
    '#auto-purchase-form',
    '#winning-number-form',
  ];

  const notManualArray = [
    '#payment-form',
    '#manual-purchase-form',
    '#auto-purchase-form',
    '#winning-number-form',
  ];

  $('#ticket-list').innerHTML = '';
  $('#ticket-count').innerHTML = '';

  $('input[name=payment-input]').disabled = false;
  $('button[name=payment-button]').disabled = false;

  if ($('#manual-number-form').length !== 0) {
    resetForm(manualArray);
    removeDOM(manualArray.slice(1, 5));
  } else {
    resetForm(notManualArray);
    removeDOM(notManualArray.slice(1, 4));
  }

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
