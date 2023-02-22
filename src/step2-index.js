import '../reset.css';
import '../style.css';

import validator from './domain/validator';
import LottoGame from './domain/LottoGame';

const budgetForm = document.querySelector('.budget_form');
const budgetError = document.querySelector('.budget_error');

const step2 = document.querySelector('#step2');

const lottoCount = document.querySelector('.lotto_count');
const lottoListBox = document.querySelector('.lotto_list_box');

const lottoNumberForm = document.querySelector('.lotto_number_form');
const winningNumbers = document.querySelectorAll('.winning_number');
const bonusNumber = document.querySelector('.bonus_number');

let lottoGame;

const displayBudgetError = (message) => {
  budgetError.innerText = message;
  budgetError.style.visibility = 'visible';
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

budgetForm.addEventListener('submit', onSubmitBudgetForm);
