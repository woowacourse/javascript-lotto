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
    ...manualArray.slice(0, 2),
    ...manualArray.slice(3, 5),
  ];
  const notAutoArray = [...manualArray.slice(0, 3), ...manualArray.slice(4, 5)];

  $('#ticket-list').innerHTML = '';
  $('#ticket-count').innerHTML = '';

  $('input[name=payment-input]').disabled = false;
  $('button[name=payment-button]').disabled = false;

  if (
    $('#manual-number-form').length !== 0 &&
    $('#auto-purchase-form').length !== 0
  ) {
    resetForm(manualArray);
    removeDOM(manualArray.slice(1));
  } else if ($('#manual-number-form').length === 0) {
    resetForm(notManualArray);
    removeDOM(notManualArray.slice(1));
  } else if ($('#auto-purchase-form').length === 0) {
    resetForm(notAutoArray);
    removeDOM(notAutoArray.slice(1));
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
