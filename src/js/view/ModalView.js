import { WINNINGS } from '../constants/constants';

export class ModalView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.restartBtn = document.getElementById('restart-button');
    this.winTable = document.getElementById('win-status');
    this.modal = document.querySelector('.modal');
    this.lottoProfit = document.getElementById('lotto-profit');

    this.winningNumber1 = document.getElementById('winning-number1');
    this.winningNumber2 = document.getElementById('winning-number2');
    this.winningNumber3 = document.getElementById('winning-number3');
    this.winningNumber4 = document.getElementById('winning-number4');
    this.winningNumber5 = document.getElementById('winning-number5');
    this.winningNumber6 = document.getElementById('winning-number6');
    this.bonusNumber = document.getElementById('winning-number7');
  }

  getWinningNumbersInput() {
    return {
      win1: Number(this.winningNumber1.value),
      win2: Number(this.winningNumber2.value),
      win3: Number(this.winningNumber3.value),
      win4: Number(this.winningNumber4.value),
      win5: Number(this.winningNumber5.value),
      win6: Number(this.winningNumber6.value),
    };
  }

  insertResultTemplate(winningStatus, lottoProfit) {
    this.lottoProfit.textContent = '';
    this.lottoProfit.insertAdjacentHTML('afterbegin', this.#lottoProfitTemplate(lottoProfit));

    this.winTable.textContent = '';
    this.winTable.insertAdjacentHTML('afterbegin', this.#winStatusTemplate(winningStatus));
  }

  openModal() {
    this.modal.classList.add('show');
    this.modal.classList.add('dark');
  }

  closeModal() {
    this.modal.classList.remove('show');
    this.modal.classList.remove('dark');
  }

  clearWinningNumbers() {
    this.winningNumber1.value = '';
    this.winningNumber2.value = '';
    this.winningNumber3.value = '';
    this.winningNumber4.value = '';
    this.winningNumber5.value = '';
    this.winningNumber6.value = '';
    this.bonusNumber.value = '';
  }

  initModalView() {
    this.winTable.textContent = '';
    this.closeModal();
    this.clearWinningNumbers();
  }

  #winStatusTemplate(winningStatus) {
    return `
    <table>
      <th>일치 갯수</th>
      <th>당첨금</th>
      <th>당첨 갯수</th>
      <tr>
          <td>3개</td>
          <td>${WINNINGS['5-place'].toLocaleString()}</td>
          <td>${winningStatus[0]}개</td>
      </tr>
      <tr>
          <td>4개</td>
          <td>${WINNINGS['4-place'].toLocaleString()}</td>
          <td>${winningStatus[1]}개</td>
      </tr>
      <tr>
          <td>5개</td>
          <td>${WINNINGS['3-place'].toLocaleString()}</td>
          <td>${winningStatus[2]}개</td>
      </tr>
      <tr>
          <td>5개+보너스볼</td>
          <td>${WINNINGS['2-place'].toLocaleString()}</td>
          <td>${winningStatus[3]}개</td>
      </tr>
      <tr>
        <td>6개</td>
        <td>${WINNINGS['1-place'].toLocaleString()}</td>
        <td>${winningStatus[4]}개</td>
      </tr>
    </table>
    `;
  }

  #lottoProfitTemplate(lottoProfit) {
    return `당신의 총 수익률은 ${lottoProfit.toLocaleString()}% 입니다.`;
  }
}
