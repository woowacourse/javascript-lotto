import BonusNumberReward from '../domain/BonusReward';
import { resetElement } from '../utils/dom';

class LottoResultModal {
  constructor(receivedRewards, profitRate) {
    this.receivedRewards = receivedRewards;
    this.profitRate = profitRate;

    this.modal = document.getElementsByClassName('modal')[0];
    this.modalContainer = document.getElementsByClassName('modal-container')[0];
    this.resultWrapper = document.getElementById('result-wrapper');
    this.closeButton = document.getElementById('close-button');
    this.closeButton.addEventListener('click', this.closeButtonHandler, true);
  }

  toggleModal() {
    this.modalContainer.classList.toggle('hidden');
  }

  render() {
    this.toggleModal();
    this.modalContainer.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
    this.renderTable();
    this.renderProfit();
  }

  createResultTable() {
    const tableHeader = `<thead>
    <tr>
      <th>일치 개수</th>
      <th>당첨금</th>
      <th>당첨 개수</th>
    </tr>
  </thead>`;
    const tableBody = `<tbody>
  ${this.receivedRewards
    .reverse()
    .map(
      ({ reward, count }) => `
  <tr>
    <td>${reward.getMatchingNumber()}개 ${reward instanceof BonusNumberReward ? `+보너스볼` : ''}
    </td>
    <td>${reward.getMoney().toLocaleString()}</td>
    <td>${count}개</td>
  </tr>
  `,
    )
    .join('')}
    </tbody>`;
    return tableHeader + tableBody;
  }

  renderTable() {
    this.table = document.createElement('table');
    this.resultWrapper.appendChild(this.table);
    this.table.insertAdjacentHTML('beforeend', this.createResultTable(this.receivedRewards));
  }

  renderProfit() {
    this.resultWrapper.insertAdjacentHTML(
      'beforeend',
      `<p id="profit-message">당신의 총 수익률은 ${this.profitRate}%입니다.</p>
      <button class="primary-button" id="restart">다시 시작하기</button>
      `,
    );
    this.restartButton = document.getElementById('restart');
  }

  resetResultTable() {
    resetElement(this.resultWrapper);
  }

  closeButtonHandler = () => {
    this.toggleModal();
    this.resetResultTable();
    this.closeButton.removeEventListener('click', this.closeButtonHandler, true);
  };

  addRestartButtonHandler(restartButtonHandler) {
    this.restartButton.addEventListener('click', (e) => {
      this.closeButton.removeEventListener('click', this.closeButtonHandler, true);
      this.toggleModal();
      this.resetResultTable();
      restartButtonHandler();
    });
  }
}

export default LottoResultModal;
