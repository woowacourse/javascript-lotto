import Component from './Component';
import Condition from '../constants/Condition';

const { RANK, PRIZE } = Condition;

class LottoStatisticsModal extends Component {
  template() {
    const { prizes, returnOnInvestment } = this.props.lottoStatistics;

    return `
      <section class="lotto-statistics-modal-overlay">
        <section class="lotto-statistics-modal">
          <button class="modal-close-btn">X</button>
          <h1 class="lotto-statistics-modal-title">🏆 당첨 통계 🏆</h1>
          <table>
            <thead>
              <tr>
                <th>일치 갯수</th>
                <th>당첨금</th>
                <th>당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              ${this.makePrizeDetailPhrases(prizes).join('')}
            </tbody>
          </table>
          <p class="return-on-investment-text">당신의 총 수익률은 ${returnOnInvestment}% 입니다.</p>
          <button class="restart-btn">다시 시작하기</button>
        </section>
      </section>
    `;
  }

  setEvent() {
    const { closeModal, restart } = this.props;

    this.$target.addEventListener('click', (event) => {
      if (event.target.classList.contains('lotto-statistics-modal-overlay')) {
        closeModal();
      }

      if (event.target.classList.contains('modal-close-btn')) {
        closeModal();
      }

      if (event.target.classList.contains('restart-btn')) {
        window.scrollTo(0, 0);
        restart();
      }
    });
  }

  makePrizeDetailPhrases(prizes) {
    return PRIZE.map(([rank, detail]) => {
      return `<tr>
            <td>${detail.MATCH}개${rank === RANK.SECOND_PLACE ? '+보너스볼' : ''}</td>
            <td>${detail.REWARD.toLocaleString()}</td>
            <td>${prizes.filter((prize) => prize === rank).length}개</td>
        </tr>`;
    });
  }
}

export default LottoStatisticsModal;
