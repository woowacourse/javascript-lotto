import { lottoResultStore } from './stores.js';
import { RANK_RULES } from '../constants/rank.js';

const LottoResult = {
  render(container) {
    this.init();

    if (!lottoResultStore.hasTrigger('lotto-result')) {
      lottoResultStore.appendTrigger('lotto-result', () => this.render(container));
    }

    if (!lottoResultStore.getState().ranks) return;

    const { ranks, returnRate } = lottoResultStore.getState();

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

  init() {
    const lottoResultContainer = document.getElementById('lotto-result-container');
    if (lottoResultContainer) {
      lottoResultContainer.remove();
    }
  },
};

export default LottoResult;
