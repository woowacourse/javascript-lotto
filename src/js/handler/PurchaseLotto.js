import { $, $$ } from '../utils/dom';
import { ERROR_MESSAGE } from '../constants/constants';
import { lottoTicket } from '../model/lottoTicket';
import { isInvalidMoneyInput } from '../validator/validator';
import { deactivateForm } from '../utils/style';

export default class PurchaseLotto {
  constructor() {
    $('.purchase-form').addEventListener('submit', this.handlePurchase);
  }

  showResultElements() {
    $$('.result').forEach((element) => element.classList.remove('d-none'));
  }

  showLottoTicketsLength(lottoTicketsLength) {
    const template = `<span>총 ${lottoTicketsLength}개를 구매하였습니다.</span>`;
    $('.purchase-status-container').insertAdjacentHTML('afterbegin', template);
  }

  showLottoImage(lottoTickets) {
    const template = lottoTickets
      .map(
        (lottoTicket) =>
          `<div class="lotto-img">
        🎟️<span class="lotto-number-detail d-none">${lottoTicket.join(', ')}</span>
      </div>`
      )
      .join('');
    $('.lotto-grid').insertAdjacentHTML('beforeend', template);
  }

  showResult(lottoTickets) {
    deactivateForm(true, ['.money-input', '.purchase-button']);
    this.showResultElements();
    this.showLottoTicketsLength(lottoTickets.length);
    this.showLottoImage(lottoTickets);
  }

  handlePurchase = (e) => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (isInvalidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    lottoTicket.issueLottoTickets(moneyInput);
    this.showResult(lottoTicket.getLottoTickets());
  };
}
