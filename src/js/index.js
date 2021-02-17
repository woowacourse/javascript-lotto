import { $ } from './utils/querySelector.js';
import { handlePurchaseResultToggle } from './controller/handlePurchaseResultToggle.js';
import { handlePurchasePriceInput } from './controller/handlePurchasePriceInput.js';
import Lotto from './model/Lotto.js';

const init = () => {
  const $purchasePriceInputFormButton = $('#purchase-price-input-form__button');
  const $purchaseResultSectionToggle = $('#purchase-result-section__toggle');

  const lotto = new Lotto();

  $purchasePriceInputFormButton.addEventListener('click', (event) =>
    handlePurchasePriceInput(event, lotto),
  );
  $purchaseResultSectionToggle.addEventListener(
    'click',
    handlePurchaseResultToggle,
  );
};

const App = () => {
  init();
};

window.addEventListener('DOMContentLoaded', App);
