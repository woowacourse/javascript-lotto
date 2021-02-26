import Lotto from './model/Lotto.js';
import { $ } from './utils/querySelector.js';
import { handleModalPage } from './handler/handleModalPage.js';
import { handleAccessbility } from './handler/handleAccessbility.js';
import { onPurchaseTypeToggle } from './handler/onPurchaseTypeToggle.js';
import { onPurchaseResultToggle } from './handler/onPurchaseResultToggle.js';
import { handlePurchasePriceSubmit } from './handler/handlePurchasePriceSubmit.js';
import { handleWinningNumberSubmit } from './handler/handleWinningNumberSubmit.js';

const init = () => {
  const lotto = new Lotto();

  $('#purchase-price-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handlePurchasePriceSubmit(lotto);
  });

  $('#winning-number-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleWinningNumberSubmit(lotto);
  });

  $('#purchase-section__toggle').addEventListener(
    'change',
    onPurchaseTypeToggle,
  );

  $('#purchase-result-section__toggle').addEventListener(
    'change',
    onPurchaseResultToggle,
  );

  $('.modal').addEventListener('click', (event) =>
    handleModalPage(event, lotto),
  );

  window.addEventListener('keyup', (event) => {
    handleAccessbility(event, lotto);
  });
};

const App = () => {
  init();
};

window.addEventListener('DOMContentLoaded', () => {
  App();
});
