import Component from './Component.js';
import LottoMachine from '../../domain/LottoMachine.js';
import { getId } from '../../utils/domHelper.js';
import { AWARDS_ORDER, PRIZE } from '../../constant/index.js';

export default class StatisticsModal extends Component {
  #setter;
  lottoList;
  statistics;
  earningRate;

  constructor({ setState, getLottoList, getStatistics, getEarningRate }) {
    super(getId('lotto-statistics-modal'));
    this.#setter = setState;
    this.lottoList = getLottoList();

    this.#setter({
      statistics: LottoMachine.calculateStatistics(this.lottoList),
      earningRate: LottoMachine.calculateEarningRate(this.lottoList),
    });

    this.statistics = getStatistics();
    this.earningRate = getEarningRate();

    this.render();
  }

  template() {
    return `
    <div id="lotto-statistics-modal-flex-option">
    <section id="lotto-statistics-modal-header-container">
      <form method="dialog">
        <button id="modal-close-button">X</button>
      </form>

      <h2 id="lotto-statistics-modal-header">🏆 당첨 통계 🏆</h2>
    </section>

    <section id="lotto-statistics-table-container">
      <table id="lotto-statistics-table">
        <thead>
          <td>일치 갯수</td>
          <td>당첨금</td>
          <td>당첨 갯수</td>
        </thead>
        ${this.statistics && this.getStatisticsRows()}
      </table>

      <div id="lotto-earning-rate">당신의 총 수익률은 ${this.earningRate}%입니다.</div>
    </section>

    <form id="lotto-retry-form" method="submit">
      <button onclick="window.location.reload()">다시 시작하기</button>
    </form>
    </div>
    `;
  }

  getStatisticsRows() {
    const formatStatistics = AWARDS_ORDER.map((award) => ({
      award,
      prize: PRIZE[award],
      count: this.statistics[award] || 0,
    }));
    return this.statisticsTemplate(formatStatistics);
  }

  statisticsTemplate(formatStatistics) {
    return formatStatistics
      .map(
        ({ award, prize, count }) => `
      <tr>
        <td>${award === 'BONUS' ? '5개+보너스볼' : `${award}개`}</td>
        <td>${prize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        <td>${count}개</td>
      </tr>`
      )
      .join('');
  }
}
