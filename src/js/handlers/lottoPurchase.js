import { lotto } from '../model/lotto.js';

import {
  $,
  disableElements,
  insertAfter,
  focusInput,
} from '../lib/utils/dom.js';
import {
  AT_LEAST_ONE,
  EXCEED_MONEY_AMOUNT,
} from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/lotto.js';
import { getTicketNumber } from '../lib/utils/lotto.js';
import { money } from '../model/money.js';
import {
  createTicketTemplate,
  createWinningNumberInputTemplate,
} from '../lib/utils/template.js';

import inputNumberRangeHandler from './input/inputNumberRange.js';
import inputNumberDuplicateHandler from './input/inputNumberDuplicate.js';
import winningNumberSubmitHandler from './winningNumberSubmit.js';


const updateTicketListView = tickets => {
  const ticketsTemplate = tickets.reduce(
    (acc, ticket) => acc + createTicketTemplate(ticket),
    ''
  );

  $('#ticket-list').innerHTML = ticketsTemplate;
  $('#ticket-count').innerHTML = `총 ${tickets.length}개를 구매하였습니다.`;
  $('#toggle-detail-mode').classList.remove('hide');
};

const lottoPurchaseHandler = event => {
  event.preventDefault();
  const autoPurchaseAmount = Number(
    event.target.elements['auto-purchase-input'].value
  );

  money.autoPurchase = autoPurchaseAmount * TICKET_PRICE;
  const availableAmount = Math.floor(money.totalAmount / TICKET_PRICE);

  if (money.totalAmount < money.autoPurchase) {
    alert(EXCEED_MONEY_AMOUNT(availableAmount));
    event.target.reset();
    return;
  }

  const autoTickets = [...Array(autoPurchaseAmount)].map(() =>
    getTicketNumber()
  );

  lotto.tickets.forEach(ticket => {
    autoTickets.push(ticket);
  });

  lotto.setTickets(autoTickets);
  money.totalAmount -= money.autoPurchase;
  $('#remaining-money').innerHTML = money.totalAmount;
  updateTicketListView(lotto.tickets);

  if (autoTickets.length === 0) {
    alert(AT_LEAST_ONE);
    focusInput('input', 'auto-purchase-input');
    event.target.reset();
    return;
  }
  insertAfter($('#ticket-list'), createWinningNumberInputTemplate());

  $('#winning-number-form').addEventListener(
    'change',
    inputNumberDuplicateHandler
  );
  $('#winning-number-form').addEventListener('change', inputNumberRangeHandler);
  $('#winning-number-form').addEventListener(
    'submit',
    winningNumberSubmitHandler
  );
  disableElements(event);
  focusInput('.winning-number', 'first');
};

export default lottoPurchaseHandler;
