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

  renderTalbe: () => {
    const tableHeader = `
    <tr id="reward-table-header">
    <th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>
  </tr>
    `;

    const tableTemplate = () => {};

    document.querySelector('#reward-table').innerHTML = tableHeader + tableTemplate;
  },
};

export default webOutputView;
