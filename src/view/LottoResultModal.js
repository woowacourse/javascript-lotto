import BonusNumberReward from '../domain/BonusReward';

class LottoResultModal {
  constructor(receivedRewards, profitRate) {
    this.receivedRewards = receivedRewards;
    this.profitRate = profitRate;

    this.modal = document.getElementsByClassName('modal')[0];
    this.modalContainer = document.getElementsByClassName('modal-container')[0];
    this.closeButton = document.getElementById('close-button');
    this.closeButton.addEventListener('click', this.closeButtonHandler.bind(this), { once: true });

    this.table = document.createElement('table');
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

  renderTable() {
    this.modal.appendChild(this.table);
    this.table.insertAdjacentHTML(
      'afterbegin',
      `<thead>
    <tr>
      <th>일치 개수</th>
      <th>당첨금</th>
      <th>당첨 개수</th>
    </tr>
  </thead>`,
    );

    const resultTable = `<tbody>
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

    this.table.insertAdjacentHTML('beforeend', resultTable);
  }

  renderProfit() {
    this.resultWrapper = document.createElement('div');
    this.resultWrapper.id = 'result-wrapper';
    this.modal.appendChild(this.resultWrapper);
    this.resultWrapper.insertAdjacentHTML(
      'beforeend',
      `<p id="profit-message">당신의 총 수익률은 ${this.profitRate}%입니다.</p>
      <button class="primary-button" id="restart">다시 시작하기</button>
      `,
    );
    this.restartButton = document.getElementById('restart');
    this.restartButton.addEventListener('click', this.restartButtonHandler.bind(this));
  }

  closeButtonHandler() {
    this.toggleModal();
    this.table.remove();
    this.resultWrapper.remove();
  }

  restartButtonHandler() {
    this.toggleModal();
    this.purchasedLottoSection = document.getElementById('purchased-lotto-section');
    this.winningLottoSection = document.getElementById('winning-lotto-section');
    this.purchasedLottoSection.innerHTML = '';
    this.winningLottoSection.innerHTML = '';
  }
}

export default LottoResultModal;
