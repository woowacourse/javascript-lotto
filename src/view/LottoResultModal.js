import BonusNumberReward from '../domain/BonusReward';
import { resetElement, toggleDisableAttribute } from '../utils/dom';

class LottoResultModal {
  constructor() {
    this.modal = document.getElementsByClassName('modal')[0];
    this.modalContainer = document.getElementsByClassName('modal-container')[0];
    this.resultWrapper = document.getElementById('result-wrapper');
    this.modalContainer.addEventListener('click', (e) => {
      if (e.target.className === 'modal-container' || e.target.id === 'close-button')
        this.closeModalHandler();
    });
    this.modalContainer.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) this.closeModalHandler();
    });
  }

  toggleModal() {
    this.modalContainer.classList.toggle('hidden');
  }

  render(receivedRewards, profitRate) {
    this.toggleModal();
    this.renderTable(receivedRewards);
    this.renderProfit(profitRate);
  }

  createResultTable(receivedRewards) {
    const tableHeader = `<thead>
    <tr>
      <th>일치 개수</th>
      <th>당첨금</th>
      <th>당첨 개수</th>
    </tr>
  </thead>`;
    const tableBody = `<tbody>
  ${receivedRewards
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

  renderTable(receivedRewards) {
    this.table = document.createElement('table');
    this.resultWrapper.appendChild(this.table);
    this.table.insertAdjacentHTML('beforeend', this.createResultTable(receivedRewards));
  }

  renderProfit(profitRate) {
    this.resultWrapper.insertAdjacentHTML(
      'beforeend',
      `<p id="profit-message">당신의 총 수익률은 ${profitRate}%입니다.</p>
      <button class="primary-button" id="restart">다시 시작하기</button>
      `,
    );
    this.restartButton = document.getElementById('restart');
    this.restartButton.focus();
  }

  resetResultTable() {
    resetElement(this.resultWrapper);
  }

  closeModalHandler = () => {
    this.toggleModal();
    this.resetResultTable();
  };

  addRestartButtonHandler(restartButtonHandler) {
    this.restartButton.addEventListener('click', (e) => {
      this.toggleModal();
      this.resetResultTable();
      restartButtonHandler();
    });
  }
}

export default LottoResultModal;
