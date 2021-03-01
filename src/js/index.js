import { $ } from './lib/utils/dom.js';
import { closeModal } from './lib/viewController/app.js';
import {
  detailModeToggleHandler,
  lottoPurchaseHandler,
  lottoResetHandler,
  winningNumberInputHandler,
  winningNumberSubmitHandler,
} from './handlers/index.js';
import manualIssueHandler from './handlers/manualIssue.js';

const initEventListeners = () => {
  $('#toggle-detail-mode').addEventListener('change', detailModeToggleHandler);
  $('#payment-submit').addEventListener('submit', lottoPurchaseHandler);
  $('#reset').addEventListener('click', lottoResetHandler);
  $('.modal-close').addEventListener('click', ({ target }) =>
    closeModal(target)
  );
  $('#lotto-number-form').addEventListener('keyup', winningNumberInputHandler);
  $('#lotto-number-form').addEventListener(
    'submit',
    winningNumberSubmitHandler
  );
  $('#manual-issue-form').addEventListener('submit', manualIssueHandler);
};

initEventListeners();
