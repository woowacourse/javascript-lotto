import { $ } from '../utils/querySelector.js';
import {
  showElement,
  hideElement,
  disabledElement,
  enabledElement,
} from '../utils/setProperty.js';

const $purchaseResultSection = $('#purchase-result-section');
const $purchaseResultSectionRowAlign = $('#purchase-result-section__row-align');
const $purchaseResultSectionColAlign = $('#purchase-result-section__col-align');
const $purchasePriceInputFormButton = $('#purchase-price-input-form__button');

const getLottoTicketIconTemplate = () => {
  return `<span class="purchase-result-section__lotto-icon mx-1 text-4xl">
            🎟️
          </span>`;
};

const getLottoTicketDetailTemplate = (
  isAutomated,
  joinedLottoTicketNumbers,
) => {
  return `<div class="d-flex">
            ${getLottoTicketIconTemplate()}
            <span class="mx-1 mt-2">${
              isAutomated ? '- 자 동 -' : '- 수 동 -'
            }</span>
            <span class="mx-1 mt-1 text-xl">${joinedLottoTicketNumbers}</span>
          </div>`;
};

export const renderPurchaseResultSection = (lotto) => {
  const amountOfLottoTicket = lotto.getAmount();
  const lottoTickets = lotto.getTickets();
  const $purchaseResultSectionLabel = $('#purchase-result-section__label');

  $purchaseResultSectionLabel.innerText = `총 ${amountOfLottoTicket}개를 구매하였습니다.`;
  $purchaseResultSectionRowAlign.innerHTML = getLottoTicketIconTemplate().repeat(
    amountOfLottoTicket,
  );

  $purchaseResultSectionColAlign.innerHTML = lottoTickets
    .map((lottoTicket) =>
      getLottoTicketDetailTemplate(
        lottoTicket.getAutomated(),
        lottoTicket.getNumbers().join(', '),
      ),
    )
    .join('');

  disabledElement($purchasePriceInputFormButton);
  showElement($purchaseResultSection);
};

export const renderPurchaseResultSectionColAlign = () => {
  showElement($purchaseResultSectionColAlign);
  hideElement($purchaseResultSectionRowAlign);
};

export const renderPurchaseResultSectionRowAlign = () => {
  showElement($purchaseResultSectionRowAlign);
  hideElement($purchaseResultSectionColAlign);
};

export const initializePurchaseResultSection = () => {
  enabledElement($purchasePriceInputFormButton);
  hideElement($purchaseResultSection);
};
