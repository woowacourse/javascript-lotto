import '../css/reset.css';
import '../css/style.css';
import '../css/modal.css';

import {
  modalToHidden,
  onClickModalBackground,
  onClickModalCloseButton,
  onClickRetryButton,
  onSubmitBudgetForm,
  onSubmitLottoNumberForm,
} from './eventHandler';

const $budgetForm = document.querySelector('.budget_form');
const $lottoNumberForm = document.querySelector('.lotto_number_form');

const $modalCloseButton = document.querySelector('.modal_close');
const $modalBackground = document.querySelector('.modal_background');

const $retryButton = document.querySelector('.retry_button');

$budgetForm.addEventListener('submit', onSubmitBudgetForm);
$lottoNumberForm.addEventListener('submit', onSubmitLottoNumberForm);

$modalCloseButton.addEventListener('click', onClickModalCloseButton);
$modalBackground.addEventListener('click', onClickModalBackground);

$retryButton.addEventListener('click', onClickRetryButton);
