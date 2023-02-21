/* eslint-disable no-undef */
import LottoMachine from './domain/LottoMachine';
import { renderLottoListTitle } from './view/web/render';

let lottoMachine;
const resultBtn = document.querySelector('.result-btn');

const buyBtn = document.querySelector('.buy-btn');
const paymentsInput = document.querySelector('.payments-input');
const winningLottoContainer = document.querySelector('.winning-lotto-container');
buyBtn.addEventListener('click', () => {
  const buyMoney = paymentsInput.value;
  // TODO: 유효성 검사
  lottoMachine = new LottoMachine(buyMoney);
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

// TODO: 네이밍 수정
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
  resultBtn.disabled = true;
  // TODO: 유효성 검사 (로또 당첨, 보너스 번호)
  const winningNumbers = Array.from(winningNumberInputs, (_) => +_.value);
  lottoMachine.generateWinningLotto(winningNumbers);
  // TODO: 유효성 검사 (로또 당첨, 보너스 번호)
  const bonusNumber = +bonusNumberInput.value;
  lottoMachine.setBonusNumber(bonusNumber);
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
