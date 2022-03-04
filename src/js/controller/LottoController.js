import { $ } from '../utils/dom';
import { ERROR_MESSAGE } from '../constants/constants';
import { isValidMoneyInput } from './validator';
import { lottoTicket } from '../model/lottoTicket';
import LottoView from '../view/LottoView';

export default class LottoController {
  constructor() {
    this.lottoView = new LottoView();
    $('.purchase-form').addEventListener('submit', this.handlePurchase);
  }

  handlePurchase = (e) => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    lottoTicket.issueLottoTickets(moneyInput);
    this.lottoView.showResult(lottoTicket.getLottoTickets());
  };
}
