import { userLottoStore, winningLottoAndBonusNumberStore } from './stores.js';
import LottoResultGenerator from '../step-1/LottoResultGenerator.js';
import { RANK_RULES } from '../constants/rank.js';

const LottoResult = {
  render(container) {
    if (!winningLottoAndBonusNumberStore.hasTrigger('lotto-result')) {
      winningLottoAndBonusNumberStore.appendTrigger('lotto-result', () => this.render(container));
    }

    if (!winningLottoAndBonusNumberStore.getState().winningLottoAndBonusNumber) return;

    const { ranks, returnRate } = this.generateLottoResult();

    const lottoResultContainer = document.createElement('div');
    const rankDiv = document.createElement('div');
    const returnRateDiv = document.createElement('div');

    lottoResultContainer.id = 'lotto-result-container';

    rankDiv.innerText = RANK_RULES.map((rule) => (
      `${rule.matchCount}개 일치 (${rule.prize.toLocaleString()}원) - ${ranks[rule.rank]}개`),
    ).join('\n');
    returnRateDiv.innerText = `총 수익률은 ${returnRate.toFixed(1)}%입니다.`;

    lottoResultContainer.appendChild(rankDiv);
    lottoResultContainer.appendChild(returnRateDiv);
    container.appendChild(lottoResultContainer);
  },

  generateLottoResult() {
    const { lottos } = userLottoStore.getState();
    const { winningLottoAndBonusNumber } = winningLottoAndBonusNumberStore.getState();

    return LottoResultGenerator.generateResult(lottos, winningLottoAndBonusNumber);
  },
};

export default LottoResult;
