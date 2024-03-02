import { createWebWinningResult } from '../utils/createWinningResult.js';

import { WEB_MESSAGES } from '../constants/messages.js';
import LOTTO_STATISTICS from '../constants/lotto-statistics.js';

const OutputWebView = {
  displayTicketCount(count) {
    return WEB_MESSAGES.ticketCount(count);
  },

  displayGeneratedLottos(generatedLottos) {
    return generatedLottos
      .map((lotto) => {
        return `<li>${WEB_MESSAGES.ticketEmoji} ${lotto.join(', ')}</li>`;
      })
      .join('');
  },

  displayStatistics(statistics) {
    const keys = Object.keys(LOTTO_STATISTICS);

    const result = keys
      .map((key) => createWebWinningResult(key, statistics[key]))
      .join('');

    return result;
  },

  displayTotalProfit(totalProfit) {
    return WEB_MESSAGES.totalProfit(totalProfit);
  },
};

export default OutputWebView;
