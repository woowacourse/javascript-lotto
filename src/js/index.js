import Lotto from './model/Lotto.js';
import { $ } from './utils/querySelector.js';
import { handlePurchaseResultToggle } from './controller/handlePurchaseResultToggle.js';
import { handlePurchasePriceInput } from './controller/handlePurchasePriceInput.js';
import { handleWinningNumberInput } from './controller/handleWinningNumberInput.js';
import { handleModalPage } from './controller/handleModalPage.js';

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
