import $ from './lib/utils/dom.js';
import detailModeToggleHandler from './handlers/detailModeToggle.js';
import lottoPurchaseHandler from './handlers/lottoPurchase.js';
import lottoResetHandler from './handlers/lottoReset.js';
import winningNumberInputHandler from './handlers/winningNumberInput.js';
import winningNumberSubmitHandler from './handlers/winningNumberSubmit.js';
import {
  modalShowHandler,
  modalCloseHandler,
} from './handlers/modalControl.js';

function initEventListeners() {
  $('#toggle-detail-mode').addEventListener('change', detailModeToggleHandler);
  $('#payment-submit').addEventListener('submit', lottoPurchaseHandler);
  $('#reset').addEventListener('click', lottoResetHandler);
  $('.open-result-modal-button').addEventListener('click', modalShowHandler);
  $('.modal-close').addEventListener('click', modalCloseHandler);
  $('#lotto-number-form').addEventListener('keyup', winningNumberInputHandler);
  $('#lotto-number-form').addEventListener(
    'submit',
    winningNumberSubmitHandler
  );
}

initEventListeners();
