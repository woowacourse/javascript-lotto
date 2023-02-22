/* eslint-disable no-undef */
import LottoMachine from './domain/LottoMachine';
import { renderLottoListTitle, renderLottoList } from './view/web/render';
import '../public/style.css';

let lottoMachine;
const resultBtn = document.querySelector('.result-btn');

const paymentsBtn = document.querySelector('.payments-btn');
const paymentsInput = document.querySelector('.payments-input');
const handlePayments = (payments) => {
  lottoMachine = new LottoMachine(payments);
};
// TODO: 이름 변경하기, 잘 분리한 걸까 ?
const afterClickHandler = () => {
  const winningLottoContainer = document.querySelector('.winning-lotto-container');
  paymentsBtn.disabled = true;
  resultBtn.disabled = false;
  winningLottoContainer.style.visibility = 'visible';
};

const resetPaymentsInput = () => {
  paymentsInput.value = '';
};

paymentsBtn.addEventListener('click', () => {
  try {
    const payments = paymentsInput.value;
    handlePayments(payments);
  } catch (error) {
    window.alert(error.message);
    resetPaymentsInput();
    return;
  }
  const lottoNumbers = lottoMachine.getLottoNumbers();
  renderLottoListTitle(lottoNumbers.length);
  renderLottoList(lottoNumbers);
  afterClickHandler();
});

const winningNumberInputContainer = document.querySelector('.winning-numbers');
const modal = document.querySelector('.modal');

const renderHitLottoCount = (winCount) => {
  const resultTableBody = modal.querySelector('tbody');
  const tableRows = resultTableBody.querySelectorAll('tr');
  // TODO: 쓰레기 고치기
  for (let i = 0; i < 5; i++) {
    const td = document.createElement('td');
    const rank = i + 1;
    const tableOrder = 5 - (i + 1);
    td.innerText = `${winCount[rank]}개`;
    tableRows[tableOrder].appendChild(td);
  }
};

const renderProfitRate = (profitRate) => {
  const resultTable = modal.querySelector('table');
  const resultProfitRate = document.createElement('p');
  resultProfitRate.innerText = `당신의 총 수익률은 ${profitRate.toFixed(2)}% 입니다.`;
  resultProfitRate.className = 'profit-rate';
  resultTable.after(resultProfitRate);
};

const renderResultTable = ({ winCount, profitRate }) => {
  renderHitLottoCount(winCount);
  renderProfitRate(profitRate);
};

const handleWinningLottos = () => {
  const winningNumberInputs = winningNumberInputContainer.querySelectorAll('.winning-number-input');
  const bonusNumberInput = document.querySelector('.bonus-number-input');
  const winningNumbers = Array.from(winningNumberInputs, (_) => +_.value);
  lottoMachine.generateWinningLotto(winningNumbers);
  const bonusNumber = +bonusNumberInput.value;
  lottoMachine.setBonusNumber(bonusNumber);
};

resultBtn.addEventListener('click', () => {
  try {
    handleWinningLottos();
  } catch (error) {
    window.alert(error.message);
    return;
  }

  resultBtn.disabled = true;
  modal.style.visibility = 'visible';
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
