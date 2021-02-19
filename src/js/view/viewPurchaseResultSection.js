import { $ } from '../utils/querySelector.js';
import {
  showElement,
  hideElement,
  disabledElement,
} from '../utils/setProperty.js';

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

export const renderPurchaseResultSection = (
  amountOfLottoTicket,
  lottoNumbers,
) => {
  const $purchasePriceInputFormButton = $('#purchase-price-input-form__button');
  const $purchaseResultSection = $('#purchase-result-section');
  const $purchaseResultSectionLabel = $('#purchase-result-section__label');

  $purchaseResultSectionLabel.innerText = `총 ${amountOfLottoTicket}개를 구매하였습니다.`;
  $purchaseResultSectionRowAlign.innerHTML = lottoTicketIconTemplate().repeat(
    amountOfLottoTicket,
  );

  $purchaseResultSectionColAlign.innerHTML = lottoNumbers
    .map((lottoNumber) => lottoTicketDetailTemplate(lottoNumber.join(', ')))
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
