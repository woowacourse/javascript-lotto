/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["ranks"] }] */

import { ACTION, LOTTO } from '../constants';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import { intersect } from '../utils';
import Store from '../flux/store';

class StatisticsModal extends Component {
  connectedCallback() {
    super.connectedCallback();
    // modal close when press esc key
    document.addEventListener('keyup', (event) => {
      if (event.key !== 'Escape') return;
      this.closeModal();
    });
  }

  // eslint-disable-next-line max-lines-per-function
  template(winningCounts, earningsRate) {
    return `
      <div class="modal modal-statistics">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">🏆 당첨 통계 🏆</h2>
              <button class="btn-close">✕</button>
            </div>
            <div class="modal-body">
              <table>
                <thead>
                  <tr>
                    <th>일치 개수</th>
                    <th>당첨금</th>
                    <th>당첨 개수</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.rowsTemplate(winningCounts)}
                </tbody>
              </table>
              <div class="earnings-rate">당신의 총 수익률은 ${earningsRate}%입니다.</div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-cyan btn-reset">다시 시작하기</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop"></div>
    `;
  }

  getEarningsRate(winningCounts) {
    const total = [5, 4, 3, 2, 1].reduce((money, rank) => {
      return money + winningCounts[rank] * LOTTO.PRIZE_MONEY[rank];
    }, 0);
    return Math.floor((total / 1000) * 100);
  }

  getWinningCounts(winningNumbers, lottoList) {
    return lottoList.reduce((winningCounts, lottoNums) => {
      const count = intersect(lottoNums, winningNumbers.normal).length;
      if (count === 6) winningCounts[1] += 1;
      else if (count === 5 && lottoNums.includes(winningNumbers.bonus)) winningCounts[2] += 1;
      else if (count === 5) winningCounts[3] += 1;
      else if (count === 4) winningCounts[4] += 1;
      else if (count === 3) winningCounts[5] += 1;
      return winningCounts;
    }, Array(6).fill(0));
  }

  rowsTemplate(winningCounts) {
    const labels = [0, '6개', '5개+보너스볼', '5개', '4개', '5개'];
    return [5, 4, 3, 2, 1]
      .map((rank) => {
        return `
          <tr>
            <td>${labels[rank]}</td>
            <td>${LOTTO.PRIZE_MONEY[rank].toLocaleString('ko-KR')}</td>
            <td>${winningCounts[rank]}개</td>
          </tr>
        `;
      })
      .join('');
  }

  setEvent() {
    this.addEvent('click', '.btn-close', () => {
      this.closeModal();
    });
    this.addEvent('click', '.modal-backdrop', () => {
      this.closeModal();
    });
    this.addEvent('click', '.btn-reset', () => {
      this.reset();
    });
  }

  closeModal() {
    document.querySelector('body').classList.remove('modal-open');
    Store.instance.dispatch(createAction(ACTION.TOGGLE_STATISTICS_MODAL, false));
  }

  reset() {
    Store.instance.dispatch(createAction(ACTION.RESET));
    this.closeModal();
  }

  render() {
    const { statisticsModalVisibility, winningNumbers, lottoList } = Store.instance.getState();
    if (!statisticsModalVisibility) {
      this.innerHTML = '';
      return;
    }
    const winningCounts = this.getWinningCounts(winningNumbers, lottoList);
    const earningsRate = this.getEarningsRate(winningCounts);
    this.innerHTML = this.template(winningCounts, earningsRate);
    document.querySelector('body').classList.add('modal-open');
  }
}

customElements.define('statistics-modal', StatisticsModal);

export default StatisticsModal;
