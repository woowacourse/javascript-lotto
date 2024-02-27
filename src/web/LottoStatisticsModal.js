import Component from './Component';
import Condition from '../constants/Condition';

const { RANK, PRIZE } = Condition;

class LottoStatisticsModal extends Component {
  template() {
    return ` 
        <section>
            <button class="modal-close-btn">X</button>
            <p>🏆 당첨 통계 🏆</p>
            <section>
                <section>
                    <p>일치 갯수</p>
                    <p>당첨금</p>
                    <p>당첨 갯수</p>
                </section>
                <section>
                    ${this.makePrizeDetailPhrases(this.props.lottoStatistics.prizes).join('')}
                </section>
            </section>
            <p>당신의 총 수익률은 ${this.props.lottoStatistics.returnOnInvestment}% 입니다.</p>
            <button class="restart-btn">다시 시작하기</button>
        </section>
    `;
  }

  setEvent() {
    this.$target
      .querySelector('.modal-close-btn')
      .addEventListener('click', () => this.props.closeModal());
  }

  makePrizeDetailPhrases(prizes) {
    return PRIZE.map(([rank, detail]) => {
      const bonusInfo = rank === RANK.SECOND_PLACE ? '+보너스볼' : '';
      return `
            <p>${detail.MATCH}개${bonusInfo}</p>
            <p>${detail.REWARD.toLocaleString()}</p>
            <p>${prizes.filter((prize) => prize === rank).length}개</p>`;
    });
  }
}

export default LottoStatisticsModal;
