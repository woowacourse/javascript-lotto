import { handlePurchaseResultToggle } from './controller/handlePurchaseResultToggle.js';
import { handlePurchasePriceInput } from './controller/handlePurchasePriceInput.js';

const init = () => {
  const $purchasePriceInputFormButton = document.querySelector(
    '#purchase-price-input-form__button',
  );
  const $purchaseResultSectionSwitch = document.querySelector(
    '#purchase-result-section__switch',
  );

  $purchasePriceInputFormButton.addEventListener(
    'click',
    handlePurchasePriceInput,
  );
  $purchaseResultSectionSwitch.addEventListener(
    'click',
    handlePurchaseResultToggle,
  );
};

const Lotto = () => {
  init();
};

window.addEventListener('DOMContentLoaded', Lotto);
