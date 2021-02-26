import Ticket from '../model/Ticket.js';
import { $ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { showWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';
import { renderPurchaseSection } from '../view/viewPurchaseSection.js';

const setLotto = (lotto, amountOfLottoTicket) => {
  const purchasePrice = amountOfLottoTicket * VALUE.LOTTO.TICKET_PRICE;

  lotto.setPurchasePrice(purchasePrice);

  while (amountOfLottoTicket--) {
    lotto.addTicket(new Ticket());
  }
};

const isValidPrice = (price) => {
  return price >= VALUE.LOTTO.TICKET_PRICE;
};

export const handlePurchasePriceSubmit = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;
  const smallChange = purchasePrice % VALUE.LOTTO.TICKET_PRICE;

  if (!isValidPrice(purchasePrice)) {
    alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
    return;
  }

  const amountOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );
  if (smallChange) {
    alert(MESSAGE.LOTTO.SMALL_CHANGE(smallChange));
  }
  lotto.setPurchasePrice(purchasePrice - smallChange);
  lotto.setPurchaseBudget(purchasePrice - smallChange);

  setLotto(lotto, amountOfLottoTicket);

  const lottoTicketNumbers = lotto
    .getTickets()
    .map((ticket) => ticket.getNumbers());

  renderPurchaseResultSection(amountOfLottoTicket, lottoTicketNumbers);
  showWinningNumberInputForm();
  $('.winning-number').focus();
  console.log(lotto);
  renderPurchaseSection(lotto);
};
