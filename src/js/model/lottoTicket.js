import { LOTTO } from '../constants/constants';
import { shuffleNumber } from '../utils/array';

export const lottoTicket = {
  store: [],

  issueLottoTickets(moneyInput) {
    const purchasedLottoTicketsLength = parseInt(moneyInput / LOTTO.TICKET_PRICE);

    for (let i = 0; i < purchasedLottoTicketsLength; i += 1) {
      const lottoTicket = this.generateLottoNumbers();
      this.store.push(lottoTicket);
    }
  },

  getLottoTickets() {
    return [...this.store];
  },

  generateLottoNumbers() {
    const candidate = Array(45)
      .fill()
      .map((element, index) => index + 1);

    return shuffleNumber(candidate).slice(0, 6);
  },

  initializeLottoTickets() {
    this.store = [];
  },
};
