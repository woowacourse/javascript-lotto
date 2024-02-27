import Component from './Component';

class LottoDisplay extends Component {
  template() {
    const { lottoTickets } = this.props;

    return `   
        <p>총 ${lottoTickets.length}개를 구매하였습니다.</p>
        <section class="lotto-display">
            ${lottoTickets
              .map((lottoTicket) => `<p><span>🎟️</span> ${lottoTicket.getSortedNumbersAscending().join(', ')}</p>`)
              .join('')}
        </section>
        `;
  }
}

export default LottoDisplay;
