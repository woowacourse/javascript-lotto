import { $ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import Ticket from '../model/Ticket.js';

const setLottoPurchasePrice = (lotto, amoutOfLottoTicket) => {
  lotto.purchasePrice = amoutOfLottoTicket * VALUE.LOTTO.TICKET_PRICE;
};

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

  const amoutOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  for (let i = 0; i < amoutOfLottoTicket; i++) {
    setLottoTicket(lotto);
  }

  setLottoPurchasePrice(lotto, amoutOfLottoTicket);
  renderPurchaseResultSection(amoutOfLottoTicket, getLottoTickets(lotto));
};
