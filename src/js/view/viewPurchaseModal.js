import { $, $$ } from '../utils/querySelector.js';

const selfResultTableTemplate = (index, joinedselfNumbers) => {
  return `<tr class="text-center">
            <td class="p-3">${index}</td>
            <td class="p-3 w-100">${joinedselfNumbers}</td>
          </tr>`;
};

export const renderSelfResultTable = (index, selfNumbers) => {
  $('#purchase-modal__self-result-section__table > tbody').insertAdjacentHTML(
    'beforeend',
    selfResultTableTemplate(index, selfNumbers.join(', ')),
  );
};
