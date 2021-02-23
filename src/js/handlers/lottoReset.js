import { lotto } from '../model/lotto.js';
import $ from '../lib/utils/dom.js';
import { closeModal } from '../lib/utils/modal.js';

const clearLottoApp = () => {
  $('#ticket-list').innerHTML = '';
  $('#ticket-count').innerHTML = '';
  $('input[name=payment-input]').value = '';
  $('.winning-number').forEach($input => {
    $input.value = '';
  });
  $('.bonus-number').value = '';
  $('#toggle-detail-mode').classList.add('hide');
};

const lottoResetHandler = () => {
  lotto.tickets = [];
  clearLottoApp();
  closeModal();
};

export default lottoResetHandler;
