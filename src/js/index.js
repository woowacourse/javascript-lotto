import Lotto from './model/Lotto.js';
import { $ } from './utils/querySelector.js';
import { handleModalPage } from './handler/handleModalPage.js';
import { handlePurchaseResultToggle } from './handler/handlePurchaseResultToggle.js';
import { handlePurchasePriceSubmit } from './handler/handlePurchasePriceSubmit.js';
import { handleWinningNumberSubmit } from './handler/handleWinningNumberSubmit.js';

const init = () => {
  const lotto = new Lotto();

  $('#purchase-price-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handlePurchasePriceSubmit(lotto);
  });

  $('#purchase-result-section__toggle').addEventListener(
    'click',
    handlePurchaseResultToggle,
  );

  $('#winning-number-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleWinningNumberSubmit(lotto);
  });

  $('.modal').addEventListener('click', (event) =>
    handleModalPage(event, lotto),
  );
};

const App = () => {
  init();
};

window.addEventListener('DOMContentLoaded', App);
