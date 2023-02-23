import Component from '../../Component.js';
import { LottoStore } from '../../domain/Lotto.js';
import parseStatistics from '../../utils/statistics.js';

export default class StatisticsModal extends Component {
  setUp() {
    this.statistics = LottoStore.calculateStatistics(this.props.lottoList);
    this.earningRate = LottoStore.calculateEarningRate(this.props.lottoList);
  }

  setEvent() {
    this.addEvent(
      'submit',
      '.lotto-store__statistics-dialog-retry-form',
      this.handleSubmitForm.bind(this)
    );
  }

  template() {
    return `
      <dialog class='lotto-store__statistics-dialog'>
        <div class='lotto-store__statistics-dialog-contents'>
          <form class='lotto-store__statistics-dialog-close-form' method='dialog'>
            <button class='lotto-store__dialog-close-btn'>X</button>
          </form>
          <h2 class='lotto-store__statistics-title'>🏆 당첨 통계 🏆</h2>
          <div class='lotto-store__statistics-table'>
            <div class='lotto-store__statistics-label'>
              <span class='lotto-store__awards-label'>일치 갯수</span>
              <span class='lotto-store__prize-label'>당첨금</span>
              <span class='lotto-store__count-label'>당첨 갯수</span>
            </div>
            <ul class='lotto-store__statistics'>
              ${this.getStatisticsTemplate()}
            </ul>
          </div>
          <div class='lotto-store__earning-rate'>당신의 총 수익률은
            ${this.earningRate}%입니다.
          </div>
          <form class='lotto-store__statistics-dialog-retry-form' method="dialog">
            <button class='lotto-store__retry-btn'>다시 시작하기</button>
          </form>
        </div>
      </dialog>
    `;
  }

  handleSubmitForm() {
    setTimeout(this.props.initState, 0);
  }

  getStatisticsTemplate() {
    const parsedStatistics = parseStatistics(this.statistics);

    return parsedStatistics
      .map(
        ({ awards, prize, count }) => `
          <li class='lotto-store__statistic'>
            <span class='lotto-store__awards'>${awards}개</span>
            <span class='lotto-store__prize'>${prize.toLocaleString()}</span>
            <span class='lotto-store__count'>${count}개</span>
          </li>`
      )
      .join('');
  }
}
