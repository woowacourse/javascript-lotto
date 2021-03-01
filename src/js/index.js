import { $ } from './lib/utils/dom.js';
import { closeModal } from './lib/viewController/app.js';
import {
  detailModeToggleHandler,
  lottoPurchaseHandler,
  lottoResetHandler,
  formNumberInputHandler,
  winningNumberSubmitHandler,
  lottoIssueEndHandler,
  manualIssueHandler,
} from './handlers/index.js';

const initEventListeners = () => {
  $('#toggle-detail-mode').addEventListener('change', detailModeToggleHandler);
  $('#payment-submit').addEventListener('submit', lottoPurchaseHandler);
  $('#reset').addEventListener('click', lottoResetHandler);
  $('.modal-close').addEventListener('click', ({ target }) =>
    closeModal(target)
  );
  $('#lotto-number-form').addEventListener('keyup', formNumberInputHandler);
  $('#manual-issue-form').addEventListener('keyup', formNumberInputHandler);
  $('#lotto-number-form').addEventListener(
    'submit',
    winningNumberSubmitHandler
  );
  $('#manual-issue-form').addEventListener('submit', manualIssueHandler);
  $('#lotto-issue-end-button').addEventListener('click', lottoIssueEndHandler);
};

initEventListeners();
