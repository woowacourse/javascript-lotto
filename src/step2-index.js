import '../css/reset.css';
import '../css/style.css';
import '../css/modal.css';

import validator from './domain/validator';
import LottoGame from './domain/LottoGame';

import view from './view/view';

const $budgetForm = document.querySelector('.budget_form');
const $budgetInput = document.querySelector('.budget_input');
const $budgetError = document.querySelector('.budget_error');

const $nextStepAfterBuyingLotto = document.querySelector('#next_step_buying_lotto');

const $lottoCount = document.querySelector('.lotto_count');
const $lottoList = document.querySelector('.lotto_list_box');

const $lottoNumberForm = document.querySelector('.lotto_number_form');
const $winningNumberInputs = document.querySelectorAll('.winning_number');
const $bonusNumberInput = document.querySelector('.bonus_number');
const $numberError = document.querySelector('.number_error');

const $modal = document.querySelector('#modal');
const $winningCounts = document.querySelectorAll('.winning_count');
const $profitRate = document.querySelector('.profit_rate');
const $modalCloseButton = document.querySelector('.modal_close');
const $modalBackground = document.querySelector('.modal_background');

const $retryButton = document.querySelector('.retry_button');

let lottoGame;

const onSubmitBudgetForm = (event) => {
  event.preventDefault();

  const budget = event.target[0].value;

  handleBudget(budget);
};

const handleBudget = (budget) => {
  try {
    validator.validateBudget(budget);
    view.initInputValue($budgetError);
    lottoGame = new LottoGame(budget);
  } catch ({ message }) {
    view.insertInnerText($budgetError, message);
    return view.convertVisibilityToVisible($budgetError);
  }

  renderNextStepAfterBuyingLotto(budget);
};

const renderNextStepAfterBuyingLotto = (budget) => {
  view.insertLottoCount($lottoCount, budget);
  view.insertBoughtLottos($lottoList, lottoGame.getBoughtLottos());

  view.convertVisibilityToVisible($nextStepAfterBuyingLotto);
};

const onSubmitLottoNumberForm = (event) => {
  event.preventDefault();

  const winningNumbers = [...$winningNumberInputs].map((input) => Number(input.value));
  const bonusNumber = $bonusNumberInput.value;

  handleLottoNumber(winningNumbers, bonusNumber);
};

const handleLottoNumber = (winningNumbers, bonusNumber) => {
  try {
    validator.validateWinningNumber(winningNumbers.join(','));
    validator.validateBonusNumber(bonusNumber);
    view.convertVisibilityToHidden($numberError);
  } catch ({ message }) {
    view.insertInnerText(message);
    return view.convertVisibilityToVisible($numberError);
  }

  renderModal(winningNumbers, bonusNumber);
};

const renderModal = (winningNumbers, bonusNumber) => {
  const winningStatus = [...lottoGame.getWinningStatus(winningNumbers, bonusNumber)].reverse();
  const profitRate = lottoGame.getProfitRate().toFixed(2);

  view.insertWinningCounts($winningCounts, winningStatus);
  view.insertProfitRate($profitRate, profitRate);

  view.convertVisibilityToVisible($modal);
};

const onClickRetryButton = () => {
  view.initInputValue($budgetInput, $bonusNumberInput);
  view.convertVisibilityToHidden($modal, $nextStepAfterBuyingLotto);
  [...$winningNumberInputs].forEach((winningNumberInput) => {
    view.initInputValue(winningNumberInput);
  });
};

$budgetForm.addEventListener('submit', onSubmitBudgetForm);
$lottoNumberForm.addEventListener('submit', onSubmitLottoNumberForm);

$modalCloseButton.addEventListener('click', () => view.convertVisibilityToHidden($modal));
$modalBackground.addEventListener('click', () => view.convertVisibilityToHidden($modal));

$retryButton.addEventListener('click', onClickRetryButton);
