import { handlePurchaseResultToggle } from './controller/handlePurchaseResultToggle.js';
import { handlePurchasePriceInput } from './controller/handlePurchasePriceInput.js';

const init = () => {
  const $purchasePriceInputFormButton = document.querySelector(
    '#purchase-price-input-form__button',
  );
  const $purchaseResultSectionToggle = document.querySelector(
    '#purchase-result-section__toggle',
  );

  $purchasePriceInputFormButton.addEventListener(
    'click',
    handlePurchasePriceInput,
  );
  $purchaseResultSectionToggle.addEventListener(
    'click',
    handlePurchaseResultToggle,
  );
};

const Lotto = () => {
  init();
};

window.addEventListener('DOMContentLoaded', Lotto);
