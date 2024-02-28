import Component from './Component';

class LottoDisplay extends Component {
  template() {
    const { lottoTickets } = this.props;

    return `   
      <p>총 ${lottoTickets.length}개를 구매하였습니다.</p>
      <ul>
        ${lottoTickets
          .map((lottoTicket) => `<li><span>🎟️</span> ${lottoTicket.getSortedNumbersAscending().join(', ')}</li>`)
          .join('')}
      </ul>
    `;
  }
}

export default LottoDisplay;
