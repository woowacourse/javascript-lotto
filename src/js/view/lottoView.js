import { $, $$ } from '../utils/dom';
import { ERROR_MESSAGE } from '../constants/constants';
import { lottoTicket } from '../model/lottoTicket';
import { isValidMoneyInput } from '../validator/validator';

export default class LottoView {
  constructor() {
    $('.cm-toggle').addEventListener('click', this.toggleNumberDetail);
    $('.purchase-form').addEventListener('submit', this.handlePurchase);
  }

  deactivateForm(enable) {
    $('.money-input').setAttribute('disabled', enable);
    $('.purchase-button').setAttribute('disabled', enable);
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
    this.deactivateForm(true);
    this.showResultElements();
    this.showLottoTicketsLength(lottoTickets.length);
    this.showLottoImage(lottoTickets);
  }

  toggleNumberDetail() {
    $('.lotto-grid').classList.toggle('lotto-grid-detail');

    $$('.lotto-number-detail').forEach((element) => {
      element.classList.toggle('d-none');
    });
  }

  handlePurchase = (e) => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    lottoTicket.issueLottoTickets(moneyInput);
    this.showResult(lottoTicket.getLottoTickets());
  };
}
