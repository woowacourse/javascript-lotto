import LottoTicket from '../domain/LottoTicket';
import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import WinningNumbersValidator from '../validator/WinningNumbersValidator';
import BonusNumberValidator from '../validator/BonusNumberValidator';
import {
  BONUS_NUMBER_INPUT_ERROR,
  PURCHASE_AMOUT_INPUT_ERROR,
  WINNING_NUMBER_INPUT_ERROR,
} from '../constant/messages';
import { PURCHASE_SYMBOL } from '../constant/symbols';

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

  processLottoNumbers(event) {
    event.preventDefault();
    const lottoNumbersInputSection = document.querySelector('.section-submit-lotto-numbers');
    lottoNumbersInputSection.classList.remove('invisible');
    const inputWinningNumbersView = document.querySelector('.wrapper-input-winning-numbers');
    const inputWinningNumberView = document.querySelectorAll('.input-winning-number');
    const lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');
    const bonusNumberInputView = document.querySelector('.input-bonus-number');
    const inputWinningNumbers = [];
    Array.from({ length: 6 }).forEach((_, index) => {
      const inputValue = Number(inputWinningNumbersView.children[index].value);
      inputWinningNumbers.push(Number(inputValue));
    });
    const validationResult = this.validateWinningNumbers(inputWinningNumbers);
    if (validationResult !== true) {
      lottoNumberErrorView.textContent = validationResult;
      Array.from(inputWinningNumberView).forEach((node) => {
        node.value = null;
      });
      bonusNumberInputView.value = null;
      this.click();
    } else {
      lottoNumberErrorView.textContent = '';
      const winningNumbers = inputWinningNumbers;
      this.processBonusNumber(winningNumbers);
    }
  }

  validateWinningNumbers(inputValue) {
    if (!WinningNumbersValidator.isValidCount(inputValue)) return WINNING_NUMBER_INPUT_ERROR.LENGTH;
    if (!WinningNumbersValidator.isNumber(inputValue)) return WINNING_NUMBER_INPUT_ERROR.TYPE;
    if (!WinningNumbersValidator.isUniqueNumbers(inputValue))
      return WINNING_NUMBER_INPUT_ERROR.UNIQUE;
    if (!WinningNumbersValidator.isValidRange(inputValue)) return WINNING_NUMBER_INPUT_ERROR.RANGE;
    return true;
  }

  processBonusNumber(winningNumbers) {
    const inputBonusNumberView = document.querySelector('.input-bonus-number');
    const lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');
    const inputBonusNumber = inputBonusNumberView.value;
    const validationResult = this.validateBonusNumber(Number(inputBonusNumber), winningNumbers);
    if (validationResult !== true) {
      lottoNumberErrorView.textContent = validationResult;
      inputBonusNumberView.value = null;
      this.click();
    } else {
      lottoNumberErrorView.value = '';
      const bonusNumber = Number(inputBonusNumber);
    }
  }

  validateBonusNumber(inputValue, winningNumbers) {
    if (!BonusNumberValidator.isNumber(inputValue)) return BONUS_NUMBER_INPUT_ERROR.TYPE;
    if (!BonusNumberValidator.isValidRange(inputValue)) return BONUS_NUMBER_INPUT_ERROR.RANGE;
    if (!BonusNumberValidator.isUniqueBonusNumber(inputValue, winningNumbers))
      return BONUS_NUMBER_INPUT_ERROR.UNIQUE;
    return true;
  }
}

export default LottoController;
