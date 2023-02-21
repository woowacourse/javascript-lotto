/* eslint-disable no-undef */
import LottoMachine from './domain/LottoMachine';
import { renderLottoListTitle, renderLottoList } from './view/web/render';

let lottoMachine;
const resultBtn = document.querySelector('.result-btn');

const buyBtn = document.querySelector('.buy-btn');
const paymentsInput = document.querySelector('.payments-input');
const winningLottoContainer = document.querySelector('.winning-lotto-container');

const handlePayments = (payments) => {
  lottoMachine = new LottoMachine(payments);
};

buyBtn.addEventListener('click', () => {
  try {
    const payments = paymentsInput.value;
    handlePayments(payments);
  } catch (error) {
    window.alert(error.message);
    paymentsInput.value = '';
    return;
  }
  const lottoNumbers = lottoMachine.getLottoNumbers();
  renderLottoListTitle(lottoNumbers.length);
  renderLottoList(lottoNumbers);

  buyBtn.disabled = true;
  resultBtn.disabled = false;
  winningLottoContainer.style.visibility = 'visible';
});

const winningNumberInputContainer = document.querySelector('.winning-numbers');
const winningNumberInputs = winningNumberInputContainer.querySelectorAll('.winning-number-input');
const bonusNumberInput = document.querySelector('.bonus-number-input');
const modal = document.querySelector('.modal');
const modalCloseBtn = modal.querySelector('.modal-close-btn');

const renderResultTable = ({ winCount, profitRate }) => {
  const resultTable = modal.querySelector('table');
  const resultTableBody = modal.querySelector('tbody');
  const tableRows = resultTableBody.querySelectorAll('tr');
  // TODO: 쓰레기 고치기
  for (let i = 0; i < 5; i++) {
    const td = document.createElement('td');
    td.innerText = `${winCount[i + 1]}개`;
    tableRows[i].appendChild(td);
  }
  const resultProfitRate = document.createElement('p');
  resultProfitRate.innerText = `당신의 총 수익률은${profitRate.toFixed(2)}% 입니다.`;
  resultTable.appendChild(resultProfitRate);
};

resultBtn.addEventListener('click', () => {
  try {
    const winningNumbers = Array.from(winningNumberInputs, (_) => +_.value);
    lottoMachine.generateWinningLotto(winningNumbers);
    const bonusNumber = +bonusNumberInput.value;
    lottoMachine.setBonusNumber(bonusNumber);
  } catch (error) {
    window.alert(error.message);
    return;
  }

  resultBtn.disabled = true;
  modal.style.visibility = 'visible';
  renderResultTable(lottoMachine.calcStatstics());
});

modalCloseBtn.addEventListener('click', () => {
  modal.style.visibility = 'hidden';
});

const modalRestartBtn = document.querySelector('.modal-restart-btn');

modalRestartBtn.addEventListener('click', () => {
  window.location.reload();
});
