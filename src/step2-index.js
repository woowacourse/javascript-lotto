import '../reset.css';
import '../style.css';
import '../modal.css';

import validator from './domain/validator';
import LottoGame from './domain/LottoGame';

const budgetForm = document.querySelector('.budget_form');
const budgetInput = document.querySelector('.budget_input');
const budgetError = document.querySelector('.budget_error');

const step2 = document.querySelector('#step2');

const lottoCount = document.querySelector('.lotto_count');
const lottoListBox = document.querySelector('.lotto_list_box');

const lottoNumberForm = document.querySelector('.lotto_number_form');
const winningNumberInput = document.querySelectorAll('.winning_number');
const bonusNumberInput = document.querySelector('.bonus_number');
const numberError = document.querySelector('.number_error');

const modal = document.querySelector('#modal');
const winningCounts = document.querySelectorAll('.winning_count');
const profitRateDiv = document.querySelector('.profit_rate');
const modalCloseBtn = document.querySelector('.modal_close');
const modalBackground = document.querySelector('.modal_background');

const retryBtn = document.querySelector('.retry_btn');

let lottoGame;

const displayModal = (winningNumbers, bonusNumber) => {
  const winningStatus = [...lottoGame.getWinningStatus(winningNumbers, bonusNumber)].reverse();
  const profitRate = lottoGame.getProfitRate().toFixed(2);
  [...winningCounts].forEach((winningCount, index) => {
    winningCount.innerText = winningStatus[index];
  });
  profitRateDiv.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
};

const displayBudgetError = (message) => {
  budgetError.innerText = message;
  budgetError.style.visibility = 'visible';
};

const displayNumberError = (message) => {
  numberError.innerText = message;
  numberError.style.visibility = 'visible';
};

const displayBoughtLottos = (lottos) => {
  const lottoDivs = [...lottos].reduce((lottoDivs, lotto) => {
    return (lottoDivs += `
    <div class='lotto'>
      <div>🎟️</div>
      <span>${lotto.join(', ')}</span>
    </div>`);
  }, '');
  lottoListBox.innerHTML = lottoDivs;
};

const onSubmitBudgetForm = (event) => {
  event.preventDefault();
  const budget = event.target[0].value;
  try {
    validator.validateBudget(budget);
    budgetError.innerText = '';
  } catch ({ message }) {
    return displayBudgetError(message);
  }

  lottoCount.innerText = `총 ${budget / 1000}개를 구매하였습니다.`;
  step2.style.visibility = 'visible';
  lottoGame = new LottoGame(budget);
  displayBoughtLottos(lottoGame.getBoughtLottos());
};

const onSubmitLottoNumberForm = (event) => {
  event.preventDefault();
  const winningNumbers = [...winningNumberInput].map((input) => Number(input.value));
  const bonusNumber = bonusNumberInput.value;
  try {
    validator.validateWinningNumber(winningNumbers.join(','));
    validator.validateBonusNumber(bonusNumber);
    numberError.style.visibility = 'hidden';
  } catch ({ message }) {
    return displayNumberError(message);
  }

  displayModal(winningNumbers, bonusNumber);
  modal.style.visibility = 'visible';
};

const onClickModalCloseBtn = () => {
  modal.style.visibility = 'hidden';
};

const onClickModalBackGround = () => {
  modal.style.visibility = 'hidden';
};

const onClickRetryBtn = () => {
  budgetInput.value = '';
  modal.style.visibility = 'hidden';
  step2.style.visibility = 'hidden';
  [...winningNumberInput].forEach((input) => {
    input.value = '';
  });
  bonusNumberInput.value = '';
};

budgetForm.addEventListener('submit', onSubmitBudgetForm);
lottoNumberForm.addEventListener('submit', onSubmitLottoNumberForm);

modalCloseBtn.addEventListener('click', onClickModalCloseBtn);
modalBackground.addEventListener('click', onClickModalBackGround);

retryBtn.addEventListener('click', onClickRetryBtn);
