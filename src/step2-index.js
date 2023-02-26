/* eslint-disable no-undef */
import { renderLottosContainer, renderResultTable } from './view/render';
import '../public/style.css';
import LottoMeditator from './LottoMeditator';

const modal = document.querySelector('.modal');
const paymentsContainer = document.querySelector('.payments-container');
const winningLottoContainer = document.querySelector('.winning-lotto-container');

const paymentsBtn = document.querySelector('.payments-btn');
const resultBtn = document.querySelector('.result-btn');
const modalRestartBtn = document.querySelector('.modal-restart-btn');
const webController = new LottoMeditator();

const handlePayments = () => {
  const paymentsInput = document.querySelector('.payments-input');
  const payments = Number(paymentsInput.value);

  webController.receivePaymentsInput(payments);
};

const changeCSSByPaymentsEvent = () => {
  paymentsBtn.disabled = true;
  resultBtn.disabled = false;
  winningLottoContainer.style.visibility = 'visible';
};

const resetPaymentsInput = () => {
  const paymentsInput = document.querySelector('.payments-input');
  paymentsInput.value = '';
};

const handleWinningLottos = () => {
  const winningNumberInputs = document.querySelectorAll('.winning-number-input');
  const bonusNumberInput = document.querySelector('.bonus-number-input');

  const winningNumbers = Array.from(winningNumberInputs, (input) => Number(input.value));
  webController.receiveWinningLottoNumbersInput(winningNumbers);

  const bonusNumber = Number(bonusNumberInput.value);
  webController.receiveBonusNumberInput(bonusNumber);
};

const changeCSSByResultBtnEvent = () => {
  resultBtn.disabled = true;
  modal.style.visibility = 'visible';
};

paymentsContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    handlePayments();
  } catch (error) {
    window.alert(error.message);
    resetPaymentsInput();
    return;
  }

  renderLottosContainer(webController.sendLottoNumbers());
  changeCSSByPaymentsEvent();
});

winningLottoContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    handleWinningLottos();
  } catch (error) {
    window.alert(error.message);
    return;
  }
  renderResultTable(webController.sendStatstics());
  changeCSSByResultBtnEvent();
});

const modalCloseBtn = modal.querySelector('.modal-close-btn');
modalCloseBtn.addEventListener('click', () => {
  modal.style.visibility = 'hidden';
});

modalRestartBtn.addEventListener('click', () => {
  window.location.reload();
});
