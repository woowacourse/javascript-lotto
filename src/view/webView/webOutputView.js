import prize from '../../domain/prize.js';
import formatNumber from '../../utils/formatNumber.js';

const webOutputView = {
  renderPurchaseAmount: (lottoTickets) => {
    const renderPurchaseAmountTemplate = `총 ${lottoTickets.length}개를 구매했습니다.`;
    document.querySelector('#purchaseHeader-text').textContent = renderPurchaseAmountTemplate;
  },

  renderLottoList: (lottoTickets) => {
    const lottoListElement = document.querySelector('#lotto-list');
    lottoListElement.innerHTML = '';

    lottoTickets.forEach((lotto) => {
      const liElement = document.createElement('li');
      const ticketEmojiSpan = document.createElement('span');
      ticketEmojiSpan.className = 'ticket-emoji';
      ticketEmojiSpan.textContent = '🎟️';

      const lottoNumberSpan = document.createElement('span');
      lottoNumberSpan.className = 'lotto-number';
      lottoNumberSpan.textContent = lotto.getNumbers().join(', ');

      liElement.appendChild(ticketEmojiSpan);
      liElement.appendChild(lottoNumberSpan);

      lottoListElement.appendChild(liElement);
    });
  },

  renderTable: (totalResult) => {
    const table = document.querySelector('#reward-table');

    const headerRow = document.createElement('tr');
    const headers = ['일치 갯수', '당첨금', '당첨 갯수'];
    headers.forEach((headerText) => {
      const header = document.createElement('th');
      header.textContent = headerText;
      header.classList.add('lotto-subtitle');
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    Object.keys(totalResult).forEach((rank) => {
      const row = document.createElement('tr');
      const matchCount = document.createElement('th');
      matchCount.textContent = `${prize.findMatchCountByRank(rank)}개`;

      const reward = document.createElement('th');
      reward.textContent = `${formatNumber(prize.findRewardByRank(rank))}`;

      const count = document.createElement('th');
      count.textContent = `${totalResult[rank]}개`;

      row.appendChild(matchCount);
      row.appendChild(reward);
      row.appendChild(count);

      table.appendChild(row);
    });
  },

  renderProfit: (profit) => {
    const profitText = document.querySelector('#profit-text');
    const profitTemplate = `당신의 총 수익률은 ${profit}%입니다.`;

    profitText.textContent = profitTemplate;
  },

  clearResults: () => {
    const resultsContainer = document.querySelector('#results-container');
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
    }
  },

  clearWinningLotto: () => {
    const inputs = document.querySelectorAll('#winning-lotto input');
    inputs.forEach((input) => {
      input.value = '';
    });
  },
};

export default webOutputView;
