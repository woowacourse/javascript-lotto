import { $, $$, focusElement } from '../utils/dom';
import { ERROR_MESSAGE } from '../constants/constants';
import { lottoTicket } from '../model/lottoTicket';
import { isInvalidMoneyInput } from '../validator/validator';
import { deactivateForm } from '../utils/dom';
import { money } from '../model/money';

export default class PurchaseLotto {
  constructor() {
    $('.purchase-form').addEventListener('submit', this.handlePurchase);
  }

  showLottoPurchaseResultElements() {
    $$('.result').forEach((element) => element.classList.remove('display-none'));
  }

  showLottoTicketsLength(lottoTicketsLength) {
    const template = `<span>총 ${lottoTicketsLength}개를 구매하였습니다.</span>
                      <span>번호 보기</span>`;
    $('.purchase-status-container').insertAdjacentHTML('afterbegin', template);
  }

  showLottoImage(lottoTickets) {
    const template = lottoTickets
      .map(
        (lottoTicket) =>
          `<div class="lotto-img">
        🎟️<span class="lotto-number-detail display-none">${lottoTicket.join(', ')}</span>
      </div>`
      )
      .join('');
    $('.lotto-grid').insertAdjacentHTML('beforeend', template);
  }

  showLottoPurcahseResult(lottoTickets) {
    deactivateForm(['.money-input', '.purchase-button']);
    this.showLottoPurchaseResultElements();
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

    money.userInput = moneyInput;
    lottoTicket.issueLottoTickets(moneyInput);
    this.showLottoPurcahseResult(lottoTicket.getLottoTickets());
    focusElement($('#winning-number-1'));
  };
}
