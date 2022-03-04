import { $ } from '../utils/dom';
import { ERROR_MESSAGE } from '../constants/constants';
import { isValidMoneyInput } from './validator';
import LottoView from '../view/LottoView';
import { LottoTicket } from '../model/LottoTicket';

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
    LottoTicket.issueLottoTickets(moneyInput);
    this.lottoView.showResult(LottoTicket.getLottoTickets());
  };
}
