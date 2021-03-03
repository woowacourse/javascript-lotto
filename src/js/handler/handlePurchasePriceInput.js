import { $ } from '../utils/querySelector.js';
import { isValidPrice } from '../utils/validator.js';
import { ERROR_MESSAGE, VALUE } from '../utils/constant.js';
import { renderPurchaseModal } from '../view/viewPurchaseModal.js';

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
  renderPurchaseModal(amountOfLottoTicket);
};
