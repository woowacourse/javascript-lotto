import Ticket from '../model/Ticket.js';
import { $ } from '../utils/querySelector.js';
import { isValidPrice } from '../utils/validator.js';
import { ERROR_MESSAGE, VALUE } from '../utils/constant.js';
import { openModal } from '../utils/setProperty.js';
import { renderPurchaseModalSelfInputFormLabel } from '../view/viewPurchaseModal.js';

export const handlePurchasePriceInput = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;

  if (!isValidPrice(purchasePrice)) {
    alert(ERROR_MESSAGE.LOTTO.INVALID_PRICE);
    return;
  }

  const amountOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  lotto.setAmount(amountOfLottoTicket);
  renderPurchaseModalSelfInputFormLabel(amountOfLottoTicket);
  openModal($('#purchase-modal'));
};
