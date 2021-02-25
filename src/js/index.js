import $ from './lib/utils/dom.js';
import detailModeToggleHandler from './handlers/detailModeToggle.js';
import lottoPurchaseHandler from './handlers/lottoPurchase.js';
import lottoResetHandler from './handlers/lottoReset.js';
import winningNumberInputHandler from './handlers/winningNumberInput.js';
import winningNumberSubmitHandler from './handlers/winningNumberSubmit.js';
import { closeModal } from './lib/utils/modal.js';

function initEventListeners() {
  $('#toggle-detail-mode').addEventListener('change', detailModeToggleHandler);
  $('#payment-submit').addEventListener('submit', lottoPurchaseHandler);
  $('#reset').addEventListener('click', lottoResetHandler);
  $('.modal-close').addEventListener('click', closeModal);
  $('#lotto-number-form').addEventListener('change', winningNumberInputHandler);
  $('#lotto-number-form').addEventListener(
    'submit',
    winningNumberSubmitHandler
  );
}

initEventListeners();
