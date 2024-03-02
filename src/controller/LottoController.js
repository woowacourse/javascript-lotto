import LottoTicket from '../domain/LottoTicket';
import WinningStatsMaker from '../domain/WinningStatsMaker';
import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import WinningNumbersValidator from '../validator/WinningNumbersValidator';
import BonusNumberValidator from '../validator/BonusNumberValidator';
import {
  BONUS_NUMBER_INPUT_ERROR,
  PURCHASE_AMOUT_INPUT_ERROR,
  WINNING_NUMBER_INPUT_ERROR,
} from '../constant/messages';
import { LOTTO_SYMBOL, PURCHASE_SYMBOL } from '../constant/symbols';

class LottoController {
  constructor() {
    this.purchaseAmount = 0;
    this.lottoTickets = [];
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document
      .querySelector('.form-purchase-amount')
      .addEventListener('submit', this.processPurchaseAmount.bind(this));
    document
      .querySelector('.btn-submit-lotto')
      .addEventListener('click', this.processWinningNumbers.bind(this));
    document
      .querySelector('.btn-submit-lotto')
      .addEventListener('click', () => this.processWinningStats());
    document
      .querySelector('.button-restart')
      .addEventListener('click', () => this.processRestart());
  }

  processPurchaseAmount(event) {
    event.preventDefault();
    const inputPurchaseAmountView = document.querySelector('.input-purchase-amount');
    const purchaseAmountErrorView = document.querySelector('.text-purchase-amount-error');
    const inputValue = inputPurchaseAmountView.value;
    console.log(inputValue, '구매금액입력값');
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
    const lottoTicketsView = document.querySelector('.ul-lotto-tickets');
    lottoTicketsSection.classList.remove('invisible');
    document.querySelector(
      '.text-lotto-count',
    ).textContent = `총 ${lottoTicketCount}개를 구매하셨습니다.`;
    const tickets = [];
    Array.from({ length: lottoTicketCount }).forEach(() => {
      const ticket = new LottoTicket().publishTicket();
      tickets.push(ticket);
      lottoTicketsView.innerHTML += `
    <li class='li-lotto-ticket'>
      <p class='text-ticket-emoji'>🎟️</p>
      <p class='text-ticket-numbers'>${ticket.join(', ')}</p>
    <li>
    `;
    });
    this.lottoTickets = tickets;
    const lottoNumbersInputSection = document.querySelector('.section-submit-lotto-numbers');
    lottoNumbersInputSection.classList.remove('invisible');
  }

  processWinningNumbers(event) {
    event.preventDefault();
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
    } else {
      lottoNumberErrorView.textContent = '';
      this.winningNumbers = inputWinningNumbers;
      this.processBonusNumber();
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

  processBonusNumber() {
    const inputBonusNumberView = document.querySelector('.input-bonus-number');
    const lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');
    const inputBonusNumber = inputBonusNumberView.value;
    const validationResult = this.validateBonusNumber(
      Number(inputBonusNumber),
      this.winningNumbers,
    );
    if (validationResult !== true) {
      lottoNumberErrorView.textContent = validationResult;
      inputBonusNumberView.value = null;
    } else {
      lottoNumberErrorView.value = '';
      this.bonusNumber = Number(inputBonusNumber);
    }
  }

  validateBonusNumber(inputValue, winningNumbers) {
    if (!BonusNumberValidator.isNumber(inputValue)) return BONUS_NUMBER_INPUT_ERROR.TYPE;
    if (!BonusNumberValidator.isValidRange(inputValue)) return BONUS_NUMBER_INPUT_ERROR.RANGE;
    if (!BonusNumberValidator.isUniqueBonusNumber(inputValue, winningNumbers))
      return BONUS_NUMBER_INPUT_ERROR.UNIQUE;
    return true;
  }

  processWinningStats() {
    const modalView = document.querySelector('.outside-modal');
    const modalCloseButton = document.querySelector('.button-modal-close');
    modalView.classList.remove('invisible');
    modalCloseButton.addEventListener('click', () => modalView.classList.add('invisible'));
    const winningStats = new WinningStatsMaker().makeWinningStats(this.lottoTickets, {
      winningNumbers: this.winningNumbers,
      bonusNumber: this.bonusNumber,
    });
    const winningStatsResultView = document.querySelector('.winning-stats-result');
    winningStatsResultView.textContent = '';
    Object.entries(winningStats)
      .reverse()
      .forEach(([prize, count]) => {
        winningStatsResultView.innerHTML += `
      <tr>
      <td class="tg-0lax">${LOTTO_SYMBOL.COUNT_CONDITION[prize]}</td>
      <td class="tg-0lax">${LOTTO_SYMBOL.PRIZE[prize].toLocaleString()}</td>
      <td class="tg-0lax">${count}</td>
      </tr>
      `;
      });
    this.processRateOfReturn(this.purchaseAmount, winningStats);
  }

  processRateOfReturn(purchaseAmount, winningStats) {
    const rateOfReturnView = document.querySelector('.wrapper-rateOfReturn');
    const prize = LOTTO_SYMBOL.PRIZE;
    const totalPrizeMoney = Object.keys(prize).reduce(
      (acc, cur) => acc + prize[cur] * winningStats[cur],
      0,
    );
    const rate = (totalPrizeMoney / purchaseAmount) * 100;
    const rateOfReturn = (Math.round(rate * 10) / 10).toFixed(1);
    rateOfReturnView.textContent = '';
    rateOfReturnView.innerHTML += `
    <p class='text-rate-of-return'>당신의 총 수익률은 ${rateOfReturn}%입니다.</p>
    `;
    rateOfReturnView.classList.remove('invisible');
  }

  processRestart() {
    const modalView = document.querySelector('.outside-modal');
    modalView.classList.add('invisible');
    const inputPurchaseAmountView = document.querySelector('.input-purchase-amount');
    inputPurchaseAmountView.value = null;
    const purchaseAmountErrorView = document.querySelector('.text-purchase-amount-error');
    purchaseAmountErrorView.textContent = '';
    const lottoTicketsSection = document.querySelector('.section-lotto-ticket');
    lottoTicketsSection.classList.add('invisible');
    const lottoTicketsView = document.querySelector('.ul-lotto-tickets');
    lottoTicketsView.textContent = '';
    const inputWinningNumbersView = document.querySelector('.section-submit-lotto-numbers');
    inputWinningNumbersView.classList.add('invisible');
    const inputWinningNumberView = document.querySelectorAll('.input-winning-number');
    inputWinningNumberView.forEach((input) => (input.value = null));
    const bonusNumberInputView = document.querySelector('.input-bonus-number');
    bonusNumberInputView.value = null;
    const lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');
    lottoNumberErrorView.textContent = '';
  }
}
export default LottoController;
