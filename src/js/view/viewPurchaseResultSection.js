import { $ } from '../utils/querySelector.js';
import { showElement, hideElement } from '../view/setViewProperty.js';

const lottoTicketIconTemplate = () => {
  return `<span class="purchase-result-section__lotto-icon mx-1 text-4xl">
            🎟️
          </span>`;
};

const lottoTicketDetailTemplate = (lottoNums) => {
  return `<div class="d-flex">
            ${lottoTicketIconTemplate()}
            <span class="mx-1 mt-1 text-xl">${lottoNums}</span>
          </div>`;
};

const $purchaseResultSectionRowAlign = $('#purchase-result-section__row-align');
const $purchaseResultSectionColAlign = $('#purchase-result-section__col-align');

export const renderPurchaseResultSection = (numberOfLottoTicket, lottos) => {
  const $purchaseResultSection = $('#purchase-result-section');
  const $purchaseResultSectionLabel = $('#purchase-result-section__label');

  $purchaseResultSectionLabel.innerText = `총 ${numberOfLottoTicket}개를 구매하였습니다.`;
  $purchaseResultSectionRowAlign.innerHTML = lottoTicketIconTemplate().repeat(
    numberOfLottoTicket,
  );
  $purchaseResultSectionColAlign.innerHTML = lottos
    .map((lotto) => lottoTicketDetailTemplate(lotto.getLottoNums()))
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
