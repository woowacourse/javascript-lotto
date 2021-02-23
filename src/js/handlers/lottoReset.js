import { lottoData } from '../model/lottoData.js';
import $ from '../lib/utils/dom.js';
import { modalCloseHandler } from './modalControl.js';

const lottoResetHandler = () => {
  modalCloseHandler();
  $('#ticket-list').innerHTML = '';
  lottoData.ticketAmount = 0;
  lottoData.tickets = [];
  $('#ticket-count').innerHTML = ``;
  $('#toggle-detail-mode').classList.add('hide');
  $('input[name=payment-input]').value = '';
};

export default lottoResetHandler;
