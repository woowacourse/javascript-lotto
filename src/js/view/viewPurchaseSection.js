import { $ } from '../utils/querySelector.js';
import { showElement } from '../utils/setProperty.js';

const $purchaseSection = $('#purchase-section');

export const renderPurchaseBudget = (lotto) => {
  $(
    '#purchase-section__budget',
  ).innerHTML = `남은 금액 : <strong>${lotto.purchasePrice}</strong>`;
};

export const renderPurchaseSection = (lotto) => {
  showElement($purchaseSection);
  renderPurchaseBudget(lotto);
};
