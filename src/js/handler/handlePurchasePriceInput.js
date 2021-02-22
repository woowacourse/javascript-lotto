import { $ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import Ticket from '../model/Ticket.js';

const generateLottoNumbers = () => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size < 6) {
    lottoNumbers.add(getRandomNumber(1, 45));
  }

  return [...lottoNumbers].sort((a, b) => a - b);
};

export const handlePurchasePriceInput = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;

  if (purchasePrice < VALUE.LOTTO.TICKET_PRICE) {
    alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
    return;
  }

  const amountOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  for (let i = 0; i < amountOfLottoTicket; i++) {
    const ticket = new Ticket();

    ticket.setNumbers(generateLottoNumbers());
    lotto.setTicket(ticket);
  }

  const lottoTicketsNumbers = lotto
    .getTickets()
    .map((ticket) => ticket.getNumbers());

  renderPurchaseResultSection(amountOfLottoTicket, lottoTicketsNumbers);
};
