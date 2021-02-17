import LottoTicket from '../model/LottoTicket.js';
import { $ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { getLottoNumber } from '../utils/getLottoNumber.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';

export const handlePurchasePriceInput = (event, lottoTickets) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;

  if (purchasePrice < VALUE.LOTTO.TICKET_PRICE) {
    return alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
  }

  const numberOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  const lottos = [...Array(numberOfLottoTicket)].map(
    () => new LottoTicket(getLottoNumber()),
  );

  renderPurchaseResultSection(numberOfLottoTicket, lottos);
};
