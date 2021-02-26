import { $ } from '../utils/querySelector.js';
import { hideElement, showElement } from '../utils/setProperty.js';

const $purchaseSection = $('#purchase-section');
const $autoPurchaseInputForm = $('#auto-purchase-input-form');
const $manualPurchaseInputForm = $('#manual-purchase-input-form');

export const renderPurchaseBudget = (lotto) => {
  $(
    '#purchase-section__budget',
  ).innerHTML = `남은 금액 : <strong>${lotto.purchaseBudget}</strong>원`;
};

export const renderPurchaseSection = (lotto) => {
  showElement($purchaseSection);
  renderPurchaseBudget(lotto);
};

export const hidePurchaseSection = () => {
  hideElement($purchaseSection);
};

export const renderAutoPurchaseForm = () => {
  showElement($autoPurchaseInputForm);
  hideElement($manualPurchaseInputForm);
};

export const renderManualPurchaseForm = () => {
  showElement($manualPurchaseInputForm);
  hideElement($autoPurchaseInputForm);
};
