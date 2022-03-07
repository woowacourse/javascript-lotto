import { $, replaceHTML } from '../utils/dom';
import { ID_SELECTOR, ID_NAME, MATCHING_NUMBER_BY_RANK, PRIZE_STRING_BY_RANK } from '../constants';
import View from '../core/View';

export default class ResultModal extends View {
  _configureDOM() {
    this.$lottoResult = $(ID_SELECTOR.LOTTO_RESULT, this.container);
    this.$profitDescription = $(ID_SELECTOR.PROFIT_DESCRIPTION, this.container);
    this.$restartButton = $(ID_SELECTOR.RESTART_BUTTON, this.container);
  }

  _bindEvents() {
    this.container.addEventListener('click', ({ target }) => {
      const targetId = target.id;
      if (targetId !== ID_NAME.MODAL_CLOSE && targetId !== ID_NAME.MODAL_CONTAINER) return;
      this.hide();
    });

    this.$restartButton.addEventListener('click', () => {
      this.props.clickRestart();
    });
  }

  renderLottoResult(status, profit) {
    replaceHTML(this.$lottoResult, this.templateLottoResult(status));
    this.$profitDescription.textContent = `당신의 총 수익률은 ${profit}% 입니다.`;
    this.show();
  }

  templateLottoResult(status) {
    return `
    <tr class="winners-table__tr">
      <th>일치 갯수</th>
      <th>당첨금</th>
      <th>당첨 갯수</th>
      ${[5, 4, 3, 2, 1]
        .map(
          rank =>
            `<tr class="winners-table__tr">
          <td>${MATCHING_NUMBER_BY_RANK[rank]}</td>
          <td>${PRIZE_STRING_BY_RANK[rank]}</td>
          <td>${status.get(rank)}개</td>
        </tr>`,
        )
        .join('')}
    </tr>`;
  }
}
