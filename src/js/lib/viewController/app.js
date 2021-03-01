import { $, enableForm } from '../utils/dom.js';
import { updateLottoIssueModalView } from './lottoIssueModal.js';
import { updateTicketListView } from './ticketList.js';

const clearLottoApp = () => {
  const $paymentForm = $('#payment-submit');
  const $lottoNumberForm = $('#lotto-number-form');
  $paymentForm.reset();
  $lottoNumberForm.reset();

  enableForm($paymentForm);

  updateTicketListView();
  updateLottoIssueModalView();
  hideDOMElement($lottoNumberForm);
  hideDOMElement($('#ticket-list-wrapper'));
};

const openModal = $target => {
  $target.classList.add('open');
};

const closeModal = $target => {
  $target.classList.remove('open');
};

const showDOMElement = $target => {
  $target.classList.remove('hide');
};

const hideDOMElement = $target => {
  $target.classList.add('hide');
};

export { clearLottoApp, openModal, closeModal, showDOMElement, hideDOMElement };
