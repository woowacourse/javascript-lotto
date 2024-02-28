import Component from './Component';

class LottoDisplay extends Component {
  template() {
    const { lottoTickets } = this.props;

    const LOTTO_DISPLAY_TEMPLATE = `   
      <p>총 ${lottoTickets.length}개를 구매하였습니다.</p>
      <section class="lotto-display">
        ${lottoTickets
          .map((lottoTicket) => `<p><span>🎟️</span> ${lottoTicket.getSortedNumbersAscending().join(', ')}</p>`)
          .join('')}
      </section>
    `;

    return LOTTO_DISPLAY_TEMPLATE;
  }
}

export default LottoDisplay;
