import { $, $$ } from '../utils/dom.js';

const clearLottoApp = () => {
  $('#ticket-list').innerHTML = '';
  $('#ticket-count').innerHTML = '';
  $('input[name=payment-input]').value = '';
  $$('.winning-number').forEach($input => {
    $input.value = '';
  });
  $('.bonus-number').value = '';
  $('#toggle-detail-mode').classList.add('hide');
};

const openModal = $target => {
  $target.classList.add('open');
};

const closeModal = $target => {
  $target.classList.remove('open');
};

export { clearLottoApp, openModal, closeModal };
