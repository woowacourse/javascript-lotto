import Lotto from './model/Lotto.js';
import { $ } from './utils/querySelector.js';
import { handlePurchasePriceInput } from './handler/handlePurchasePriceInput.js';
import { handleSelfNumberInput } from './handler/handleSelfNumberInput.js';
import { handleAutoNumberInput } from './handler/handleAutoNumberInput.js';
import { handlePurchaseResultToggle } from './handler/handlePurchaseResultToggle.js';
import { handleWinningNumberInput } from './handler/handleWinningNumberInput.js';
import { handleResultModal } from './handler/handleResultModal.js';

const init = () => {
  const lotto = new Lotto();

  $('#purchase-price-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handlePurchasePriceInput(lotto);
  });

  $('#purchase-modal__self-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleSelfNumberInput(lotto);
  });

  $('#purchase-modal__auto-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleAutoNumberInput(lotto);
  });

  $('#purchase-result-section__toggle').addEventListener(
    'click',
    handlePurchaseResultToggle,
  );

  $('#winning-number-input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleWinningNumberInput(lotto);
  });

  $('#result-modal').addEventListener('click', (event) =>
    handleResultModal(event, lotto),
  );
};

const App = () => {
  init();
};

window.addEventListener('DOMContentLoaded', App);
