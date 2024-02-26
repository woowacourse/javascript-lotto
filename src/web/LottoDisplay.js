import Component from './Component';

class LottoDisplay extends Component {
  template() {
    const { lottoTickets } = this.props;

    if (lottoTickets.length > 1) {
      return `    
        <section>
            <p>총 ${lottoTickets.length}개를 구매하였습니다.</p>
            ${lottoTickets
              .map((lottoTicket) => `<p>🎟️ ${lottoTicket.getSortedNumbersAscending()}</p>`)
              .join('')}
        </section>
        `;
    } else {
      return '';
    }
  }
}

export default LottoDisplay;
