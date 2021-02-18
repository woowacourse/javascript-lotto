import { $ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';

export const handlePurchasePriceInput = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;

  if (purchasePrice < VALUE.LOTTO.TICKET_PRICE) {
    return alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
  }

  const numberOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  for (let i = 0; i < numberOfLottoTicket; i++) {
    lotto.getTicket();
  }

  renderPurchaseResultSection(numberOfLottoTicket, lotto.putLottoNumbers());
};
