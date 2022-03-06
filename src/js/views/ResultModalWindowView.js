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
      <div class="${DOM_STRING.MODAL_OVERLAY} ${
      isModalOpened ? '' : DOM_STRING.MODAL_CLOSED
    }">
        <div class="${DOM_STRING.MODAL_WINDOW}">
          <h2 class="${DOM_STRING.SUBTITLE}">🏆 당첨 통계 🏆</h6>
          <div class="${DOM_STRING.MODAL_CONTENT}">
            <table id="${DOM_STRING.RESULT_TABLE}">
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
                      <td>${LOTTO.PRIZE[rank].AMOUNT.toLocaleString(
                        'ko-KR'
                      )}</td>
                      <td>${count}개</td>
                    <tr>
                  `;
                  })
                  .join('')}
              </tbody>
            </table>
            <p>당신의 총 수익률은 ${rateOfReturn * 100}%입니다.</p>
          </div>
          <button
            id="${DOM_STRING.RESTART_BUTTON}"
            class="${DOM_STRING.SUBMIT_BUTTON}"
          >
            다시 시작하기
          </button>
        </div>
      </div>
    `;
  }

  bindOnClickModalOverlay(callback) {
    this.bindEventListener(
      'click',
      { attributeName: DOM_STRING.RESTART_BUTTON, attributeType: 'id' },
      this.handleOnClickModalOverlay.bind(this, callback)
    );
  }

  handleOnClickModalOverlay(callback) {
    this.closeModalWindow();

    callback();
  }

  closeModalWindow() {
    this.update({ isModalOpened: false });
  }

  showModalWindow() {
    this.update({ isModalOpened: true });
  }
}
