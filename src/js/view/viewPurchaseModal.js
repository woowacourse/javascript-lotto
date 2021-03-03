import { $, $$ } from '../utils/querySelector.js';
import { openModal } from '../utils/setProperty.js';

const selfResultTableTemplate = (index, joinedselfNumbers) => {
  return `<tr class="text-center">
            <td class="p-3">${index}</td>
            <td class="p-3 w-100">${joinedselfNumbers}</td>
          </tr>`;
};

export const renderPurchaseModal = (amountOfLottoTicket) => {
  $(
    '#purchase-modal__self-input-form__label',
  ).innerText = `총 ${amountOfLottoTicket}개를 구매 할 수 있습니다.`;
  openModal($('#purchase-modal'));
};

export const renderSelfResultTable = (index, selfNumbers) => {
  $('#purchase-modal__self-result-section__table > tbody').insertAdjacentHTML(
    'beforeend',
    selfResultTableTemplate(index, selfNumbers.join(', ')),
  );
};

export const clearSelfResultTable = () => {
  $('#purchase-modal__self-result-section__table > tbody').innerHTML = '';
};
