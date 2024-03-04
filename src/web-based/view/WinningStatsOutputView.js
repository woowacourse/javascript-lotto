import { LOTTO_SYMBOL } from '../../constant/symbols';

class WinningStatsOutputView {
  modalView = document.querySelector('.outside-modal');
  modalCloseButtonView = document.querySelector('.button-modal-close');
  winningStatsResultView = document.querySelector('.winning-stats-result');

  displayModal() {
    this.modalView.classList.remove('invisible');
    this.modalCloseButtonView.addEventListener('click', () =>
      this.modalView.classList.add('invisible'),
    );
    this.modalView.addEventListener('click', (event) => {
      if (event.target === this.modalView) {
        this.modalView.classList.add('invisible');
      }
    });
  }

  displayWinningStats(winningStats) {
    this.winningStatsResultView.textContent = '';
    Object.entries(winningStats)
      .reverse()
      .forEach(([prize, count]) => {
        const trElement = document.createElement('tr');

        const countConditionElement = document.createElement('td');
        countConditionElement.textContent = LOTTO_SYMBOL.MATCH_COUNT_PER_RANK[prize];

        const prizeElement = document.createElement('td');
        prizeElement.textContent = LOTTO_SYMBOL.PRIZE[prize].toLocaleString();

        const countElement = document.createElement('td');
        countElement.textContent = count;

        trElement.appendChild(countConditionElement);
        trElement.appendChild(prizeElement);
        trElement.appendChild(countElement);

        this.winningStatsResultView.appendChild(trElement);
      });
  }

  resetToInitialState() {
    this.modalView.classList.add('invisible');
    this.winningStatsResultView.textContent = '';
  }
}

export default new WinningStatsOutputView();
