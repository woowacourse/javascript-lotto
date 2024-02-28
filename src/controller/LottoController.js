import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import { PURCHASE_AMOUT_INPUT_ERROR } from '../constant/messages';

class LottoController {
  constructor() {
    this.purchaseAmount = 0;
    this.lottoTickets = [];
  }

  start() {
    document
      .querySelector('.form-purchase-amount')
      .addEventListener('submit', this.processPurchaseAmount.bind(this));
  }

  processPurchaseAmount(event) {
    event.preventDefault();
    const inputPurchaseAmountView = document.querySelector('.input-purchase-amount');
    const purchaseAmountErrorView = document.querySelector('.text-purchase-amount-error');
    const inputValue = inputPurchaseAmountView.value;
    const purchaseAmount = Number(inputValue);
    const validationResult = this.validatePurchaseAmount(purchaseAmount);
    if (validationResult !== true) {
      inputPurchaseAmountView.value = null;
      purchaseAmountErrorView.textContent = validationResult;
    } else {
      this.purchaseAmount = purchaseAmount;
      purchaseAmountErrorView.textContent = '';
    }
    this.processLottoTicket();
  }

  validatePurchaseAmount(inputValue) {
    if (!PurchaseAmountValidator.isNumber(inputValue)) return PURCHASE_AMOUT_INPUT_ERROR.TYPE;
    if (!PurchaseAmountValidator.isValidUnit(inputValue)) return PURCHASE_AMOUT_INPUT_ERROR.UNIT;
    if (!PurchaseAmountValidator.isValidMinRange(inputValue))
      return PURCHASE_AMOUT_INPUT_ERROR.RANGE;
    return true;
  }

  processLottoTicket() {
    const lottoTicketCount = this.purchaseAmount / PURCHASE_SYMBOL.UNIT;
    const lottoTicketsSection = document.querySelector('.section-lotto-ticket');
    lottoTicketsSection.classList.remove('invisible');
    document.querySelector(
      '.text-lotto-count',
    ).textContent = `총 ${lottoTicketCount}개를 구매하셨습니다.`;
    const tickets = [];
    Array.from({ length: lottoTicketCount }).forEach(() => {
      const ticket = new LottoTicket().publishTicket();
      tickets.push(ticket);
      const lottoTicketsView = document.querySelector('.ul-lotto-tickets');
      lottoTicketsView.innerHTML += `
    <li class='li-lotto-ticket'>
      <p class='text-ticket-emoji'>🎟️</p>
      <p class='text-ticket-numbers'>${ticket.join(', ')}</p>
    <li>
    `;
    });
    this.lottoTickets = tickets;
    this.click();
  }

  click() {
    document
      .querySelector('.btn-submit-lotto')
      .addEventListener('click', this.processLottoNumbers.bind(this));
  }
}

export default LottoController;
