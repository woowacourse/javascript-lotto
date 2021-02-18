import Lotto from './model/Lotto.js';
import { $ } from './utils/querySelector.js';
import { handlePurchaseResultToggle } from './controller/handlePurchaseResultToggle.js';
import { handlePurchasePriceInput } from './controller/handlePurchasePriceInput.js';
import { handleWinningNumberInput } from './controller/handleWinningNumberInput.js';

const init = () => {
  const $purchasePriceInputFormButton = $('#purchase-price-input-form__button');
  const $purchaseResultSectionToggle = $('#purchase-result-section__toggle');
  const $winningNumberInputFormButton = $('#winning-number-input-form__button');

  const lotto = new Lotto();

  $purchasePriceInputFormButton.addEventListener('click', () =>
    handlePurchasePriceInput(lotto),
  );
  $purchaseResultSectionToggle.addEventListener(
    'click',
    handlePurchaseResultToggle,
  );
  $winningNumberInputFormButton.addEventListener(
    'click',
    handleWinningNumberInput,
  );
};

const App = () => {
  init();
};

window.addEventListener('DOMContentLoaded', App);
