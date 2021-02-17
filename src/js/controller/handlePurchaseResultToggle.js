import { hideElement, showElement } from '../utils/setViewProperty.js';

export const handlePurchaseResultToggle = ({ target }) => {
  const $purchaseResultSectionRowAlign = document.querySelector(
    '#purchase-result-section__row-align',
  );
  const $purchaseResultSectionColAlign = document.querySelector(
    '#purchase-result-section__col-align',
  );

  if (target.checked) {
    showElement($purchaseResultSectionColAlign);
    hideElement($purchaseResultSectionRowAlign);
    return;
  }

  showElement($purchaseResultSectionRowAlign);
  hideElement($purchaseResultSectionColAlign);
};
