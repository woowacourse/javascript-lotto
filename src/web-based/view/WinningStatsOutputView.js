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
  }

  displayWinningStats(winningStats) {
    this.winningStatsResultView.textContent = '';
    Object.entries(winningStats)
      .reverse()
      .forEach(([prize, count]) => {
        this.winningStatsResultView.innerHTML += `
        <tr>
        <td class="tg-0lax">${LOTTO_SYMBOL.COUNT_CONDITION[prize]}</td>
        <td class="tg-0lax">${LOTTO_SYMBOL.PRIZE[prize].toLocaleString()}</td>
        <td class="tg-0lax">${count}</td>
        </tr>
        `;
      });
  }

  resetToInitialState() {
    this.modalView.classList.add('invisible');
    this.winningStatsResultView.textContent = '';
  }
}

export default new WinningStatsOutputView();
