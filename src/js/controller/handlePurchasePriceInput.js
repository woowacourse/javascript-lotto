import { $ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { isValidPrice } from '../utils/validator.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { renderWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';

export const handlePurchasePriceInput = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;

  if (!isValidPrice(purchasePrice)) {
    return alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
  }

  const amountOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  for (let i = 0; i < amountOfLottoTicket; i++) {
    lotto.getTicket();
  }

  renderPurchaseResultSection(amountOfLottoTicket, lotto.putLottoTickets());
  renderWinningNumberInputForm();
};
