import Ticket from '../model/Ticket.js';
import { $ } from '../utils/querySelector.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { showWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';

const generateLottoNumber = () => {
  const ticketNumbers = new Set();

  while (ticketNumbers.size < VALUE.LOTTO.TICKET_LENGH) {
    ticketNumbers.add(
      getRandomNumber(VALUE.LOTTO.MIN_NUM, VALUE.LOTTO.MAX_NUM),
    );
  }

  return [...ticketNumbers].sort((a, b) => a - b);
};

const setLotto = (lotto, amountOfLottoTicket) => {
  const purchasePrice = amountOfLottoTicket * VALUE.LOTTO.TICKET_PRICE;

  lotto.setPurchasePrice(purchasePrice);

  while (amountOfLottoTicket--) {
    const ticket = new Ticket();

    ticket.setNumbers(generateLottoNumber());
    lotto.addTicket(ticket);
  }
};

const isValidPrice = (price) => {
  return price >= VALUE.LOTTO.TICKET_PRICE;
};

export const handlePurchasePriceSubmit = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;

  if (!isValidPrice(purchasePrice)) {
    alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
    return;
  }

  const amountOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  setLotto(lotto, amountOfLottoTicket);

  const lottoTicketNumbers = lotto
    .getTickets()
    .map((ticket) => ticket.getNumbers());

  renderPurchaseResultSection(amountOfLottoTicket, lottoTicketNumbers);
  showWinningNumberInputForm();
};
