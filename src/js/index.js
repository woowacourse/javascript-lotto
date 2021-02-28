import { $, randomColor } from './lib/utils/dom.js';
import detailModeToggleHandler from './handlers/detailModeToggle.js';
import purchaseAmountHandler from './handlers/purchaseAmount.js';
import lottoResetHandler from './handlers/lottoReset.js';
import { closeModal } from './lib/utils/modal.js';

function initEventListeners() {
  $('#toggle-detail-mode').addEventListener('change', detailModeToggleHandler);
  $('#payment-form').addEventListener('submit', purchaseAmountHandler);
  $('#reset').addEventListener('click', lottoResetHandler);
  $('.modal-close').addEventListener('click', closeModal);
  $('.remains').style.borderColor = randomColor();
}

initEventListeners();
