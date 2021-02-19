import Lotto from './model/Lotto.js';
import { $ } from './utils/querySelector.js';
import { handlePurchaseResultToggle } from './handler/handlePurchaseResultToggle.js';
import { handlePurchasePriceInput } from './handler/handlePurchasePriceInput.js';
import Lotto from './model/Lotto.js';

const init = () => {
  const lotto = new Lotto();

  $('#purchase-price-input-form__button').addEventListener('click', () =>
    handlePurchasePriceInput(lotto),
  );

  $('#purchase-result-section__toggle').addEventListener(
    'click',
    handlePurchaseResultToggle,
  );

  $('#winning-number-input-form__button').addEventListener('click', () =>
    handleWinningNumberInput(lotto),
  );

  $('.modal').addEventListener('click', handleModalPage);
};

const App = () => {
  init();
};

window.addEventListener('DOMContentLoaded', App);
