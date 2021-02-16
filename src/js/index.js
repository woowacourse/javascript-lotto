import { handlePurchasePriceInput } from './handlePurchasePriceInput.js';

const init = () => {
  const $purchasePriceInputFormButton = document.querySelector(
    '#purchase-price-input-form__button',
  );
  $purchasePriceInputFormButton.addEventListener(
    'click',
    handlePurchasePriceInput,
  );
};

const Lotto = () => {
  init();
};

window.addEventListener('DOMContentLoaded', Lotto);
