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
      </tr>
      `,
    );

    console.log('tableTemplate', tableTemplate);
    document.querySelector('#reward-table').innerHTML = tableHeader + tableTemplate;
  },
};

export default webOutputView;
