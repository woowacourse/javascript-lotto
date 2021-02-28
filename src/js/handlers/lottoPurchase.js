import { lotto } from '../model/lotto.js';
import {
  $,
  disableElements,
  insertAfter,
  focusInput,
} from '../lib/utils/dom.js';
import {
  DUPLICATE_INPUT_NUMBER,
  EXCEED_MONEY_AMOUNT,
  LESS_THAN_TICKET_PRICE_MESSAGE,
} from '../lib/constants/alertMessage.js';
import { TICKET_NUMBER_AMOUNT, TICKET_PRICE } from '../lib/constants/lotto.js';
import {
  sliceArray,
  getTicketNumber,
  getValueFromElements,
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

const getManualInputs = (event, begin) => {
  return [...event.target.elements].slice(
    begin,
    event.target.elements.length - 1
  );
};

const buyManualNumber = event => {
  event.preventDefault();
  const manualNumberElements = getManualInputs(event, 0);
  const manualNumbersArray = sliceArray(
    getValueFromElements(manualNumberElements),
    TICKET_NUMBER_AMOUNT
  );

  const isValidManualNumber = manualNumbersArray.map(manualNumbers => {
    if (hasDuplicate(manualNumbers)) {
      return false;
    }
    return true;
  });

  if (isValidManualNumber.includes(false)) {
    alert(DUPLICATE_INPUT_NUMBER);
    return;
  }

  lotto.tickets = manualNumbersArray;

  const newAvailableAmount = money.totalAmount / TICKET_PRICE;
  if (newAvailableAmount === 0) {
    focusInput('.winning-number', 'first');
    return;
  }

  $('#remaining-money').innerHTML = money.totalAmount;
  disableElements(event);
  insertAfter(event.target, createAutoPurchaseTemplate());

  $('#auto-purchase-form').addEventListener('submit', lottoPurchaseHandler);
  focusInput('input', 'auto-purchase-input');
};

const inputNumberDuplicateHandler = ({ target }) => {
  const sliceRange = { begin: 0, end: 6 };
  let inputArray = [...target.parentElement.children];

  if (target.parentElement.children.length !== 7) {
    sliceRange.begin = 0;
    sliceRange.end = 7;
    inputArray = [...target.form];
  }

  const isUniqueNumber = inputArray
    .slice(sliceRange.begin, sliceRange.end)
    .map(child => {
      if (child.value !== '') {
        return child.value;
      }
    })
    .filter(child => child !== undefined);

  if (hasDuplicate(isUniqueNumber)) {
    target.value = '';
    target.focus();
    alert(DUPLICATE_INPUT_NUMBER);
  }
};

const manualPurchaseHandler = event => {
  event.preventDefault();
  const manualPurchaseAmount = Number(
    event.target.elements['manual-purchase-input'].value
  );
  money.manualPurchase = manualPurchaseAmount * TICKET_PRICE;
  const availableAmount = Math.floor(money.totalAmount / TICKET_PRICE);

  if (money.totalAmount < money.manualPurchase) {
    alert(EXCEED_MONEY_AMOUNT(availableAmount));
    event.target.reset();
    return;
  }

  money.totalAmount -= money.manualPurchase;
  disableElements(event);
  insertAfter(event.target, createManualInputTemplate(manualPurchaseAmount));

  $('#manual-number-form').addEventListener(
    'change',
    inputNumberDuplicateHandler
  );
  $('#manual-number-form').addEventListener('change', inputNumberRangeHandler);
  $('#manual-number-form').addEventListener('submit', buyManualNumber);
  $('#remaining-money').innerHTML = money.totalAmount;
  focusInput('.manual-number', 'first');
};

const purchaseAmountHandler = event => {
  event.preventDefault();
  money.totalAmount = Number(event.target.elements['payment-input'].value);

  if (money.totalAmount < TICKET_PRICE) {
    alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    return;
  }

  disableElements(event);
  insertAfter(event.target, createManualPurchaseTemplate());
  $('#remaining-money').innerHTML = money.totalAmount;
  $('#manual-purchase-form').addEventListener('submit', manualPurchaseHandler);
  focusInput('input', 'manual-purchase-input');
};

export default purchaseAmountHandler;
