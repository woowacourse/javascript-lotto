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
    this.bonusNumber = document.getElementById('winning-number7');
    this.winningLottoContainer = document.getElementById('winning-lotto-container');
  }

  getWinningNumbersInput() {
    return { ...[...this.winningLottoContainer.winNumber].map((el) => Number(el.value)) };
  }

  insertResultTemplate(winningStatus, lottoProfit) {
    this.lottoProfit.textContent = '';
    this.lottoProfit.insertAdjacentHTML('afterbegin', this.#lottoProfitTemplate(lottoProfit));

    this.winTable.textContent = '';
    this.winTable.insertAdjacentHTML('afterbegin', this.#winStatusTemplate(winningStatus));
  }

  openModal() {
    this.modal.classList.add('show');
  }

  closeModal() {
    this.modal.classList.remove('show');
  }

  clearWinningNumbers() {
    this.winningLottoContainer.winNumber.forEach((el) => (el.value = ''));
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
