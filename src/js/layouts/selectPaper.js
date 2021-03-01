import { LOTTO_PAPER_CHECK_MESSAGE } from '../constants/display.js';
import { LOTTO_NUMBERS_LENGTH } from '../constants/lottoRules.js';

let tabIndex = 0;

const getSelectPaperItemHTML = (number) => {
  return `
  <li>
    <label>
      <input type="checkbox" value=${number} aria-label="select${number}" />
      <span tabIndex=${tabIndex++}>${number}</span>
    </label>
  </li>
  `;
};

export const getApplyQuantitySelectHTML = ({ quantity }) => {
  return quantity === 1
    ? `<option value="${quantity}" class="selected" selected>${quantity}장</option>`
    : `<option value="${quantity}">${quantity}장</option>`;
};

export const getSelectPaperHTML = ({ issueNum }) => {
  return `
  <div class="manual-select-paper mt-3 d-flex flex-col" data-issue-num=${issueNum}>
    <div class="quantity-applier mb-5 d-flex items-end">
      <label class="mr-2 text-sm">적용수량</label>
      <select class="quantity-select" tabIndex=${tabIndex++}>
      </select>
    </div>
    <ul class="select-number-list m-0 p-0">
      ${[...Array(45)].map((_, i) => getSelectPaperItemHTML(i + 1)).join('')}
    </ul>
    <div class="manual-select-check-message text-sm">${LOTTO_PAPER_CHECK_MESSAGE.NEED_TO_SELECT_MORE(
      LOTTO_NUMBERS_LENGTH
    )}</div>
    <button type="button" class="paper-remove-button r-btn btn-rose">-</button>
  </div>`;
};
