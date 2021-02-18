import { $ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import Ticket from '../model/Ticket.js';

const setLottoNumbers = (ticket) => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size < 6) {
    lottoNumbers.add(getRandomNumber(1, 45));
  }

  ticket.numbers = [...lottoNumbers].sort((a, b) => a - b);
};

const setLottoTicket = (lotto) => {
  const ticket = new Ticket();

  setLottoNumbers(ticket);
  lotto.tickets.push(ticket);
};

const getLottoTickets = (lotto) => {
  return lotto.tickets.map((ticket) => ticket.numbers);
};

export const handlePurchasePriceInput = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;

  if (purchasePrice < VALUE.LOTTO.TICKET_PRICE) {
    alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
    return;
  }

  const numberOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  for (let i = 0; i < numberOfLottoTicket; i++) {
    setLottoTicket(lotto);
  }

  renderPurchaseResultSection(numberOfLottoTicket, getLottoTickets(lotto));
};
