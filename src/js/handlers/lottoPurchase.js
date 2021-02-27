import { lotto } from '../model/lotto.js';
import $ from '../lib/utils/dom.js';
import { LESS_THAN_TICKET_PRICE_MESSAGE } from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/lotto.js';
import { getTicketNumber } from '../lib/utils/lotto.js';
import { money } from '../model/money.js';
import {
  createTicketTemplate,
  createAutoPurchaseTemplate,
  createManualPurchaseTemplate,
  createManualInputTemplate,
} from '../lib/utils/template.js';

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
  focusFirstWinningNumberInput();
};

const buyManualNumber = event => {
  event.preventDefault();

  const { first, second, third, fourth, fifth, sixth } = event.target.elements;

  if (event.target.elements.length - 1 !== 6) {
    for (let i = 0; i < (event.target.elements.length - 1) / 6; i++) {
      const manualArray = [
        Number(first[i].value),
        Number(second[i].value),
        Number(third[i].value),
        Number(fourth[i].value),
        Number(fifth[i].value),
        Number(sixth[i].value),
      ];
      lotto.tickets.push(manualArray);
    }
  } else {
    lotto.tickets.push([
      Number(first.value),
      Number(second.value),
      Number(third.value),
      Number(fourth.value),
      Number(fifth.value),
      Number(sixth.value),
    ]);
  }

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
  $('#manual-number-form').addEventListener('submit', buyManualNumber);
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
