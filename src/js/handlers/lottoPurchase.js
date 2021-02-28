import { lotto } from '../model/lotto.js';
import $ from '../lib/utils/dom.js';
import {
  DUPLICATE_WINNING_NUMBER,
  LESS_THAN_TICKET_PRICE_MESSAGE,
} from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/lotto.js';
import {
  getSliceArrayByLottoLength,
  getTicketNumber,
} from '../lib/utils/lotto.js';
import { money } from '../model/money.js';
import {
  createTicketTemplate,
  createAutoPurchaseTemplate,
  createManualPurchaseTemplate,
  createManualInputTemplate,
  createWinningNumberInputTemplate,
} from '../lib/utils/template.js';
import { hasDuplicate } from '../lib/utils/validation.js';
import inputNumberRangeHandler from './winningNumberInput.js';
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

const focusFirstWinningNumberInput = () => {
  $('.winning-number[name=first]').focus();
};

const lottoPurchaseHandler = event => {
  event.preventDefault();
  const autoPurchaseAmount = Number(
    event.target.elements['auto-purchase-input'].value
  );

  money.autoPurchase = autoPurchaseAmount * TICKET_PRICE;
  const availableAmount = Math.floor(money.totalAmount / TICKET_PRICE);

  if (money.totalAmount < money.autoPurchase) {
    alert(
      `구입 가능 금액을 초과했습니다. ${availableAmount}개 이내의 개수를 입력해주세요.`
    );
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

  updateTicketListView(lotto.tickets);

  $('#ticket-list').insertAdjacentHTML(
    'afterend',
    createWinningNumberInputTemplate()
  );
  $('#winning-number-form').addEventListener('change', inputNumberRangeHandler);
  $('#winning-number-form').addEventListener(
    'submit',
    winningNumberSubmitHandler
  );

  focusFirstWinningNumberInput();
};

const buyManualNumber = event => {
  event.preventDefault();
  const manualInputArray = [...event.target.elements].slice(
    0,
    event.target.elements.length - 1
  );

  const manualInputValueArray = manualInputArray.reduce((acc, cur) => {
    acc.push(Number(cur.value));
    return acc;
  }, []);

  const validManualInputArray = getSliceArrayByLottoLength(
    manualInputValueArray
  ).filter(ticket => !hasDuplicate(ticket));

  if (validManualInputArray.length === 0) {
    alert(DUPLICATE_WINNING_NUMBER);
    return;
  }

  lotto.tickets = validManualInputArray;

  const newAvailableAmount = money.totalAmount / TICKET_PRICE;
  if (newAvailableAmount === 0) {
    focusFirstWinningNumberInput();
    return;
  }

  event.target.insertAdjacentHTML('afterend', createAutoPurchaseTemplate());
  $('#auto-purchase-form').addEventListener('submit', lottoPurchaseHandler);
  $('input[name=auto-purchase-input]').focus();
};

const manualPurchaseHandler = event => {
  event.preventDefault();
  const manualPurchaseAmount = Number(
    event.target.elements['manual-purchase-input'].value
  );
  money.manualPurchase = manualPurchaseAmount * TICKET_PRICE;

  const availableAmount = Math.floor(money.totalAmount / TICKET_PRICE);

  if (money.totalAmount < money.manualPurchase) {
    alert(
      `구입 가능 금액을 초과했습니다. ${availableAmount}개 이내의 개수를 입력해주세요.`
    );
    event.target.reset();
    return;
  }

  money.totalAmount -= money.manualPurchase;

  event.target.elements['manual-purchase-submit'].disabled = true;
  event.target.insertAdjacentHTML(
    'afterend',
    createManualInputTemplate(manualPurchaseAmount)
  );

  $('#manual-number-form').addEventListener('change', inputNumberRangeHandler);
  $('#manual-number-form').addEventListener('submit', buyManualNumber);

  $('.manual-number').length === 6
    ? $('.manual-number[name=first]').focus()
    : $('.manual-number[name=first]')[0].focus();
};

const purchaseAmountHandler = event => {
  event.preventDefault();
  money.totalAmount = Number(event.target.elements['payment-input'].value);

  if (money.totalAmount < TICKET_PRICE) {
    alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    return;
  }

  event.target.elements['payment-button'].disabled = true;
  event.target.insertAdjacentHTML('afterend', createManualPurchaseTemplate());
  $('#manual-purchase-form').addEventListener('submit', manualPurchaseHandler);
  $('input[name=manual-purchase-input]').focus();
};

export default purchaseAmountHandler;
