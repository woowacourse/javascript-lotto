import { $ } from '../utils/querySelector.js';
import {
  showElement,
  hideElement,
  enabledElement,
} from '../utils/setProperty.js';

const $purchaseResultSection = $('#purchase-result-section');
const $purchaseResultSectionRowAlign = $('#purchase-result-section__row-align');
const $purchaseResultSectionColAlign = $('#purchase-result-section__col-align');

const lottoTicketIconTemplate = () => {
  return `<span class="purchase-result-section__lotto-icon mx-1 text-4xl">
            🎟️
          </span>`;
};

const lottoTicketDetailTemplate = (lottoNumber) => {
  return `<div class="d-flex">
            ${lottoTicketIconTemplate()}
            <span class="mx-1 mt-1 text-xl">${lottoNumber}</span>
          </div>`;
};

export const renderPurchaseResultSection = (lotto) => {
  const lottoTickets = lotto.getTickets();
  const amountOfLottoTicket = lottoTickets.length;
  const $purchaseResultSectionLabel = $('#purchase-result-section__label');

  $purchaseResultSectionLabel.innerText = `총 ${amountOfLottoTicket}개를 구매하였습니다.`;
  $purchaseResultSectionRowAlign.innerHTML = lottoTicketIconTemplate().repeat(
    amountOfLottoTicket,
  );
  $purchaseResultSectionColAlign.innerHTML = lottoTickets
    .map((ticket) => lottoTicketDetailTemplate(ticket.numbers.join(', ')))
    .join('');

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
  enabledElement($('#purchase-price-input-form__button'));
  hideElement($purchaseResultSection);
};
