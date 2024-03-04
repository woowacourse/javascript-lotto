import { createWebWinningResult } from '../utils/createWinningResult.js';

import { WEB_MESSAGES } from '../constants/messages.js';
import LOTTO_STATISTICS from '../constants/lotto-statistics.js';

const OutputWebView = {
  displayTicketCount(count) {
    return WEB_MESSAGES.ticketCount(count);
  },

  displayGeneratedLottos(generatedLottos) {
    const $ul = document.createElement('ul');
    $ul.setAttribute('id', 'generated-lotto-contents');
    $ul.setAttribute('class', 'generated-lotto-contents');

    generatedLottos.forEach((lotto) => {
      const $li = document.createElement('li');
      $li.textContent = `${WEB_MESSAGES.ticketEmoji} ${lotto.join(', ')}`;
      $ul.appendChild($li);
    });

    return $ul;
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
