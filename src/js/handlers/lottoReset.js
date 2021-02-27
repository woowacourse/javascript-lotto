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

  $('#toggle-detail-mode').classList.add('hide');
};

const lottoResetHandler = () => {
  lotto.tickets = [];
  clearLottoApp();
  closeModal();
};

export default lottoResetHandler;
