import LottoTicket from '../../domain/LottoTicket';
import { $ } from './utils/dom';

class LottoContainer {
  constructor() {
    this.lottoTicketArray = [];
  }

  init() {
    $('.purchase-amount').value = '';
    $('.purchase-amount').focus();
    this.lottoTicketArray = [];
  }

  createLottoTickets(amount) {
    Array.from({ length: amount / 1000 }).forEach(() => {
      this.lottoTicketArray.push(new LottoTicket().tickets);
    });
  }

  renderLottoTickets() {
    $('.lotto-display').innerHTML = this.generateLottotemplate();
    $('.lotto-app-container').style.height = '727px';
    this.updateHeight();
  }

  updateHeight() {
    const lottoBoxHeight = $('.lotto-box').scrollHeight;
    $('.lotto-box').style.height = `${lottoBoxHeight}px`;

    const containerHeight = $('.lotto-app-container').scrollHeight;
    $('.lotto-app-container').style.height = `${containerHeight}px`;
  }

  generateLottotemplate() {
    return String.raw`
      <h4 class="lotto-message">총 ${Number($('.purchase-amount').value) / 1000}개를 구매하였습니다.</h4>
      <div class="lotto-box">
      ${this.lottoTicketArray.map((lotto) => `<div class="lotto-number">${lotto.join(', ')}</div>`).join('')}
        </div>
        `;
  }

  getLottoTicketArray() {
    return this.lottoTicketArray;
  }
}

export default LottoContainer;
