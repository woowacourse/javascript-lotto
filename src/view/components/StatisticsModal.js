import Component from '../../Component.js';
import { LottoStore } from '../../domain/Lotto.js';
import parseStatistics from '../../utils/statistics.js';

export default class StatisticsModal extends Component {
  setUp() {
    this.statistics = LottoStore.calculateStatistics(this.props.lottoList);
    this.earningRate = LottoStore.calculateEarningRate(this.props.lottoList) || 0;
  }

  setEvent() {
    this.addEvent('submit', '.statistics-modal__dialog__form', this.handleSubmitForm.bind(this));
  }

  template() {
    return `
      <dialog class='statistics-modal__dialog'>
        <h2>🏆 당첨 통계 🏆</h2>
        <ul>${this.getStatisticsTemplate()}</ul>
        <div>당신의 총 수익률은 ${this.earningRate}%입니다.</div>
        <form class='statistics-modal__dialog__form' method="dialog">
          <button>다시 시작하기</button>
        </form>
      </dialog>
    `;
  }

  handleSubmitForm() {
    this.props.initState();
  }

  getStatisticsTemplate() {
    const parsedStatistics = parseStatistics(this.statistics);

    return parsedStatistics
      .map(
        ({ awards, prize, count }) => `
          <li>
            <span>${awards}개</span>
            <span>${prize.toLocaleString()}</span>
            <span>${count}개</span>
          </li>`
      )
      .join('');
  }
}
