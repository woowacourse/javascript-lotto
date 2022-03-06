import View from '../core/View.js';
import { DOM_STRING, LOTTO } from '../configs/contants.js';
import { prizeAmountAscendingOrder } from '../utils/utils.js';

export default class ResultModalWindowView extends View {
  setup() {
    this.state = { isModalOpened: false, rankCount: {}, rateOfReturn: 0 };
  }

  template() {
    const { isModalOpened, rankCount, rateOfReturn } = this.state;

    return `
      <div id="modal" class="modal-overlay ${
        isModalOpened ? '' : 'modal-closed'
      }">
        <div class="modal-window">
          <h6 class="modal-title">🏆 당첨 통계 🏆</h6>
          <div class="modal-content">
            <table id="result-table">
              <thead>
                <tr>
                  <th>일치 개수</th>
                  <th>당첨금</th>
                  <th>당첨 개수</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(rankCount)
                  .sort(prizeAmountAscendingOrder)
                  .map(([rank, count]) => {
                    return `
                    <tr>
                      <td>${LOTTO.PRIZE[rank].TITLE}</td>
                      <td>${LOTTO.PRIZE[rank].AMOUNT}</td>
                      <td>${count}개</td>
                    <tr>
                  `;
                  })
                  .join('')}
              </tbody>
            </table>
            <p>당신의 총 수익률은 ${rateOfReturn * 100}%입니다.</p>
          </div>
          <button id="restart-button">다시 시작하기</button>
        </div>
      </div>
    `;
  }

  closeModalWindow() {
    this.update({ isModalOpened: false });
  }

  showModalWindow() {
    this.update({ isModalOpened: true });
  }

  bindOnClickModalOverlay(callback) {
    this.bindEventListener(
      'click',
      { attributeName: DOM_STRING.RESTART_BUTTON, attributeType: 'id' },
      (e) => {
        this.closeModalWindow();

        callback();
      }
    );
  }
}
