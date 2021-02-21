import Lotto from './model/Lotto.js';
import { $ } from './utils/querySelector.js';
import { handlePurchaseResultToggle } from './handler/handlePurchaseResultToggle.js';
import { handlePurchasePriceInput } from './handler/handlePurchasePriceInput.js';
import { handleWinningNumberInput } from './handler/handleWinningNumberInput.js';
import { handleModalPage } from './handler/handleModalPage.js';

const init = () => {
  const lotto = new Lotto();

  $('#purchase-price-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handlePurchasePriceInput(lotto);
  });

  $('#purchase-result-section__toggle').addEventListener(
    'click',
    handlePurchaseResultToggle,
  );

  $('#winning-number-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleWinningNumberInput(lotto);
  });

  $('.modal').addEventListener('click', (event) =>
    handleModalPage(event, lotto),
  );
};

const App = () => {
  init();
};

window.addEventListener('DOMContentLoaded', App);
