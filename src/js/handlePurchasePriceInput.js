import LottoTicket from './model/LottoTicket.js';
import { ERR_MESSAGE, VALUE } from './utils/constant.js';
import { getLottoNumber } from './utils/getLottoNumber.js';
import { showElement } from './utils/setAttribute.js';

const lottoTicketIconTemplate = () => {
  return `<span class="purchase-result-section__lotto-icon mx-1 text-4xl">
            🎟️
          </span>`;
};

const renderPurchaseResultSection = (numberOfLottoTicket) => {
  const $purchaseResultSection = document.querySelector(
    '#purchase-result-section',
  );

  const $purchaseResultSectionLabel = document.querySelector(
    '#purchase-result-section__label',
  );

  const $purchaseResultSectionRowAlign = document.querySelector(
    '#purchase-result-section__row-align',
  );

  $purchaseResultSectionLabel.innerText = `총 ${numberOfLottoTicket}개를 구매하였습니다.`;
  $purchaseResultSectionRowAlign.innerHTML = lottoTicketIconTemplate().repeat(
    numberOfLottoTicket,
  );

  showElement($purchaseResultSection);
};

export const handlePurchasePriceInput = () => {
  const purchasePrice = document.querySelector(
    '#purchase-price-input-form__input',
  ).value;

  if (purchasePrice < VALUE.LOTTO.TICKET_PRICE) {
    return alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
  }

  const numberOfLottoTicket = Math.floor(
    purchasePrice / VALUE.LOTTO.TICKET_PRICE,
  );

  const lottos = [...Array(numberOfLottoTicket)].map(
    () => new LottoTicket(getLottoNumber()),
  );

  console.log(lottos);

  renderPurchaseResultSection(numberOfLottoTicket);
};
