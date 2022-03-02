import { $, replaceHTML } from '../utils/dom.js';
import { ID_SELECTOR, CLASS_NAME, ID_NAME } from '../constants.js';
import View from '../core/View.js';

export default class ResultModal extends View {
  _configureDOM() {
    this.$modalContainer = $(ID_SELECTOR.MODAL_CONTAINER);
    this.$lottoResult = $(ID_SELECTOR.LOTTO_RESULT);
    this.$profitDescription = $(ID_SELECTOR.PROFIT_DESCRIPTION);
    this.$restartButton = $(ID_SELECTOR.RESTART_BUTTON);
  }

  _bindEvents() {
    this.$modalContainer.addEventListener('click', ({ target }) => {
      const targetId = target.id;
      if (targetId !== ID_NAME.MODAL_CLOSE && targetId !== ID_NAME.MODAL_CONTAINER) return;
      this.toggleModal();
    });

    this.$restartButton.addEventListener('click', () => {
      this.props.clickRestart();
    });
  }

  toggleModal() {
    this.$modalContainer.classList.toggle(CLASS_NAME.MODAL_OPEN);
  }

  showLottoResult(result, profit) {
    replaceHTML(
      this.$lottoResult,
      `
  <tr class="winners-table__tr">
    <th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>
  </tr>
  <tr class="winners-table__tr" >
    <td>3개</td>
    <td>5,000</td>
    <td>${result.get(5)}개</td>
  </tr>
  <tr class="winners-table__tr">
    <td>4개</td>
    <td>50,000</td>
    <td>${result.get(4)}개</td>
  </tr>
  <tr class="winners-table__tr">
    <td>5개</td>
    <td>1,500,000</td>
    <td>${result.get(3)}개</td>
  </tr>
  <tr class="winners-table__tr">
    <td>5개 + 보너스볼</td>
    <td>30,000,000</td>
    <td>${result.get(2)}개</td>
  </tr>
  <tr class="winners-table__tr">
    <td>6개</td>
    <td>2,000,000,000</td>
    <td>${result.get(1)}개</td>
  </tr>
    `,
    );
    this.$profitDescription.textContent = `당신의 총 수익률은 ${profit}% 입니다.`;
    this.toggleModal();
  }
}
