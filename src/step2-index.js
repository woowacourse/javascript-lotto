/* eslint-disable no-undef */
import LottoMachine from './domain/LottoMachine';
import { renderLottosContainer, renderResultTable } from './view/web/render';
import '../public/style.css';

const resultBtn = document.querySelector('.result-btn');
const paymentsBtn = document.querySelector('.payments-btn');
const modal = document.querySelector('.modal');

let lottoMachine;

const getIntegerValue = (numberInput) => {
  return Number(numberInput.value);
};

const handlePayments = () => {
  const paymentsInput = document.querySelector('.payments-input');
  const payments = getIntegerValue(paymentsInput);
  lottoMachine = new LottoMachine(payments);
};

const changeCSSByPaymentsBtnClick = () => {
  const winningLottoContainer = document.querySelector('.winning-lotto-container');
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

  const winningNumbers = Array.from(winningNumberInputs, getIntegerValue);
  lottoMachine.generateWinningLotto(winningNumbers);

  const bonusNumber = getIntegerValue(bonusNumberInput);
  lottoMachine.setBonusNumber(bonusNumber);
};

const changeCSSByResultBtnClick = () => {
  resultBtn.disabled = true;
  modal.style.visibility = 'visible';
};

paymentsBtn.addEventListener('click', () => {
  try {
    handlePayments();
  } catch (error) {
    window.alert(error.message);
    resetPaymentsInput();
    return;
  }

  renderLottosContainer(lottoMachine.getLottoNumbers());
  changeCSSByPaymentsBtnClick();
});

resultBtn.addEventListener('click', () => {
  try {
    handleWinningLottos();
  } catch (error) {
    window.alert(error.message);
    return;
  }
  changeCSSByResultBtnClick();
  renderResultTable(lottoMachine.calcStatstics());
});

const modalCloseBtn = modal.querySelector('.modal-close-btn');
modalCloseBtn.addEventListener('click', () => {
  modal.style.visibility = 'hidden';
});

const modalRestartBtn = document.querySelector('.modal-restart-btn');
modalRestartBtn.addEventListener('click', () => {
  window.location.reload();
});
