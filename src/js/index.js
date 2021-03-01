import $ from './lib/utils/dom.js';
import { closeModal } from './lib/viewController/modal.js';
import {
  detailModeToggleHandler,
  lottoPurchaseHandler,
  lottoResetHandler,
  winningNumberInputHandler,
  winningNumberSubmitHandler,
} from './handlers/index.js';

function initEventListeners() {
  $('#toggle-detail-mode').addEventListener('change', detailModeToggleHandler);
  $('#payment-submit').addEventListener('submit', lottoPurchaseHandler);
  $('#reset').addEventListener('click', lottoResetHandler);
  $('.modal-close').addEventListener('click', closeModal);
  $('#lotto-number-form').addEventListener('keyup', winningNumberInputHandler);
  $('#lotto-number-form').addEventListener(
    'submit',
    winningNumberSubmitHandler
  );
}

initEventListeners();
