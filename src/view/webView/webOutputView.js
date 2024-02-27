import prize from '../../domain/prize';
import formatNumber from '../../utils/formatNumber';

const webOutputView = {
  renderLottoList: (lottoTickets) => {
    const lottoListTemplate = lottoTickets
      .map(
        (lotto) => `<li>
        <span class="ticket-emoji">🎟️</span
        ><span class="lotto-number">${lotto.getNumbers().join(', ')}</span>
      </li>`,
      )
      .join('');
    document.querySelector('#lotto-list').innerHTML = lottoListTemplate;
  },

  renderTalbe: (totalResult) => {
    const tableHeader = `
    <tr id="reward-table-header">
    <th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>
  </tr>
    `;

    const tableTemplate = Object.keys(totalResult).map(
      (rank) =>
        `<tr>
        <th>${prize.findMatchCountByRank(rank)}개</th>
        <th>${formatNumber(prize.findRewardByRank(rank))}</th>
        <th>${totalResult[rank]}개</th>
      </tr>`,
    );

    document.querySelector('#reward-table').innerHTML = `${tableHeader} ${tableTemplate.join('')}`;
  },

  renderProfit: (profit) => {
    const profitText = document.querySelector('#profit-text');
    const profitTemplate = `당신의 총 수익률은 ${profit}%입니다.`;

    profitText.innerHTML = profitTemplate;
  },

  clearLottoList: () => {
    const lottoListContainer = document.querySelector('#lottoList-container');
    if (lottoListContainer) {
      lottoListContainer.innerHTML = '';
    }
  },

  clearResults: () => {
    const resultsContainer = document.querySelector('#results-container');
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
    }

    const resultModal = document.querySelector('#modal-background');
    if (resultModal) {
      resultModal.style.display = 'none';
    }
  },

  clearWinningLotto: () => {
    const inputs = document.querySelectorAll('#winning-lotto input');
    inputs.forEach((input) => {
      input.value = ''; // 각 입력 필드의 값을 빈 문자열로 설정
    });
  },
};

export default webOutputView;
