import { $ } from '../utils/dom';
import { ERROR_MESSAGE, LOTTO } from '../constants/constants';
import { isValidMoneyInput } from './validator';
import Lotto from '../model/Lotto';
import LottoView from '../view/LottoView';

export default class LottoController {
  constructor() {
    this.lottoTickets = [];
    this.lottoView = new LottoView();
    $('.purchase-form').addEventListener('submit', this.handlePurchase);
  }

  issueLottoTickets(moneyInput) {
    const purchasedLottoTicketsLength = parseInt(moneyInput / LOTTO.TICKET_PRICE);

    for (let i = 0; i < purchasedLottoTicketsLength; i += 1) {
      const lottoTicket = new Lotto();
      this.lottoTickets.push(lottoTicket.lottoNumbers);
    }
  }

  handlePurchase = (e) => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    this.issueLottoTickets(moneyInput);
    this.lottoView.showResult(this.lottoTickets);
  };
}
