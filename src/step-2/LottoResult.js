import { lottoResultStore } from './stores.js';
import LottoRanksTable from './LottoRanksTable.js';

const LottoResult = {
  render(container) {
    const { ranks, returnRate } = lottoResultStore.getState();

    const lottoResultContainer = document.createElement('div');
    const returnRateDiv = document.createElement('div');

    lottoResultContainer.id = 'lotto-result-container';

    returnRateDiv.innerText = `총 수익률은 ${returnRate.toFixed(1)}%입니다.`;

    LottoRanksTable.render(lottoResultContainer, { ranks });
    lottoResultContainer.appendChild(returnRateDiv);
    container.appendChild(lottoResultContainer);
  },
};

export default LottoResult;
