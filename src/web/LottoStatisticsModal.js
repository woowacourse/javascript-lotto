import Component from './Component';
import Condition from '../constants/Condition';

const { RANK, PRIZE } = Condition;

class LottoStatisticsModal extends Component {
  template() {
    const { prizes, returnOnInvestment } = this.props.lottoStatistics;

    return ` 
        <section class="lotto-statistics-modal">
            <button class="modal-close-btn">X</button>
            <p class="lotto-statistics-modal-title">🏆 당첨 통계 🏆</p>
            <section class="prize-table">
                <section class="prize-table-header">
                    <p>일치 갯수</p>
                    <p>당첨금</p>
                    <p>당첨 갯수</p>
                </section>
                <section class="prize-table-body">
                    ${this.makePrizeDetailPhrases(prizes).join('')}
                </section>
            </section>
            <p class="return-on-investment-text">당신의 총 수익률은 ${returnOnInvestment}% 입니다.</p>
            <button class="restart-btn">다시 시작하기</button>
        </section>
    `;
  }

  setEvent() {
    const { closeModal, restart } = this.props;

    this.$target.querySelector('.modal-close-btn').addEventListener('click', () => closeModal());
    this.$target.querySelector('.restart-btn').addEventListener('click', () => restart());
  }

  makePrizeDetailPhrases(prizes) {
    return PRIZE.map(([rank, detail]) => {
      const bonusInfo = rank === RANK.SECOND_PLACE ? '+보너스볼' : '';
      return `
          <section class="prize-table-content">
            <p>${detail.MATCH}개${bonusInfo}</p>
            <p>${detail.REWARD.toLocaleString()}</p>
            <p>${prizes.filter((prize) => prize === rank).length}개</p>
          </section>
          `;
    });
  }
}

export default LottoStatisticsModal;
