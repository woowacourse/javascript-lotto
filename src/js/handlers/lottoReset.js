import { lotto } from '../model/lotto.js';
import $ from '../lib/utils/dom.js';
import { closeModal } from '../lib/utils/modal.js';

const clearLottoApp = () => {
  $('#ticket-list').innerHTML = '';
  $('#ticket-count').innerHTML = '';

  $('#payment-form').reset();
  $('#manual-purchase-form').reset();
  $('#manual-number-form').reset();
  $('#auto-purchase-form').reset();
  $('#winning-number-form').reset();

  $('button[name=payment-button]').disabled = false;
  $('#manual-purchase-form').parentNode.removeChild($('#manual-purchase-form'));
  $('#manual-number-form').parentNode.removeChild($('#manual-number-form'));
  $('#auto-purchase-form').parentNode.removeChild($('#auto-purchase-form'));
  $('#winning-number-form').parentNode.removeChild($('#winning-number-form'));

  $('#toggle-detail-mode').classList.add('hide');
  $('input[name=payment-input]').focus();
};

const lottoResetHandler = () => {
  lotto.tickets = [];
  clearLottoApp();
  closeModal();
};

export default lottoResetHandler;
