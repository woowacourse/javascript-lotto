import { WEB_MESSAGES } from '../constants/messages.js';
import {
  LOTTO_STATISTICS,
  COMPARE_LOTTO_COUNT,
} from '../constants/lotto-statistics.js';

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
    const $tbody = document.createElement('tbody');
    $tbody.setAttribute('id', 'lotto-statistics-tbody');

    const keys = Object.keys(statistics);
    keys.forEach((key) => {
      const tr = document.createElement('tr');
      const { number, price } = LOTTO_STATISTICS[key];
      const bonusText = key === COMPARE_LOTTO_COUNT ? ' + 보너스볼' : '';
      const count = statistics[key];

      const tdKey = document.createElement('td');
      const tdValue = document.createElement('td');
      const tdCount = document.createElement('td');

      tdKey.textContent = `${number}개${bonusText}`;
      tdValue.textContent = `${price.toLocaleString()}원`;
      tdCount.textContent = `${count}개`;

      tr.appendChild(tdKey);
      tr.appendChild(tdValue);
      tr.appendChild(tdCount);
      $tbody.appendChild(tr);
    });

    return $tbody;
  },

  displayTotalProfit(totalProfit) {
    return WEB_MESSAGES.totalProfit(totalProfit);
  },
};

export default OutputWebView;
