import LottoTicket from '../../domain/LottoTicket';
import WinningStatsMaker from '../../domain/WinningStatsMaker';
import PurchaseAmountOutputView from '../view/PurchaseAmountOutputView';
import LottoTicektsOutputView from '../view/LottoTicektsOutputView';
import WinningNumbersOutputView from '../view/WinningNumbersOutputView';
import BonusNumberOutputView from '../view/BonusNumberOutputView';
import LottoTicketsOutputView from '../view/LottoTicektsOutputView';
import WinningStatsOutputView from '../view/WinningStatsOutputView';
import RateOfReturnOutputView from '../view/RateOfReturnOutputView';
import PurchaseAmountValidator from '../../validator/PurchaseAmountValidator';
import WinningNumbersValidator from '../../validator/WinningNumbersValidator';
import BonusNumberValidator from '../../validator/BonusNumberValidator';
import {
  BONUS_NUMBER_INPUT_ERROR,
  PURCHASE_AMOUT_INPUT_ERROR,
  WINNING_NUMBER_INPUT_ERROR,
} from '../../constant/messages';
import { LOTTO_SYMBOL, PURCHASE_SYMBOL } from '../../constant/symbols';

class LottoWebController {
  purchaseAmount = 0;
  lottoTickets = [];
  winningNumbers = [];
  bonusNumber = 0;

  constructor() {
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
      .querySelector('.button-restart')
      .addEventListener('click', () => this.processRestart());
  }

  processPurchaseAmount(event) {
    event.preventDefault();
    const inputPurchaseAmountView = document.querySelector('.input-purchase-amount');
    const inputValue = inputPurchaseAmountView.value;
    const purchaseAmount = Number(inputValue);
    const validationResult = this.validatePurchaseAmount(purchaseAmount);

    if (validationResult !== true) {
      PurchaseAmountOutputView.displayPurchaseAmountInput(false);
      PurchaseAmountOutputView.displayPurchaseAmountError(validationResult);
      PurchaseAmountOutputView.displayPurchaseButton(false);
    } else {
      this.purchaseAmount = purchaseAmount;
      PurchaseAmountOutputView.displayPurchaseAmountInput(true);
      PurchaseAmountOutputView.displayPurchaseAmountError('');
      PurchaseAmountOutputView.displayPurchaseButton(true);
      this.processLottoTickets();
    }
  }

  validatePurchaseAmount(inputValue) {
    if (!PurchaseAmountValidator.isNumber(inputValue)) return PURCHASE_AMOUT_INPUT_ERROR.TYPE;
    if (!PurchaseAmountValidator.isValidUnit(inputValue)) return PURCHASE_AMOUT_INPUT_ERROR.UNIT;
    if (!PurchaseAmountValidator.isValidMinRange(inputValue))
      return PURCHASE_AMOUT_INPUT_ERROR.RANGE;
    return true;
  }

  processLottoTickets() {
    const lottoTicketCount = this.purchaseAmount / PURCHASE_SYMBOL.UNIT;
    const tickets = [];
    Array.from({ length: lottoTicketCount }).forEach(() => {
      const ticket = new LottoTicket().publishTicket();
      tickets.push(ticket);
    });
    this.lottoTickets = tickets;

    LottoTicektsOutputView.displayLottoTicketsSection(this.lottoTickets);
    WinningNumbersOutputView.displayWinningNumbersInputSection();
    WinningNumbersOutputView.displayWinningNumbersInput();
  }

  processWinningNumbers() {
    const inputWinningNumbers = WinningNumbersOutputView.getWinningNumbers();
    const validationResult = this.validateWinningNumbers(inputWinningNumbers);

    if (validationResult !== true) {
      WinningNumbersOutputView.displayLottoNumbersError(validationResult);
      WinningNumbersOutputView.resetWinningNumbersAndBonusNumber();
    } else {
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
    const inputBonusNumber = BonusNumberOutputView.getBonusNumber();
    const validationResult = this.validateBonusNumber(inputBonusNumber, this.winningNumbers);

    if (validationResult !== true) {
      BonusNumberOutputView.displayLottoNumberError(validationResult);
      BonusNumberOutputView.resetBonusNumber();
    } else {
      this.bonusNumber = inputBonusNumber;
      this.processWinningStats();
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
    const winningStats = new WinningStatsMaker().makeWinningStats(this.lottoTickets, {
      winningNumbers: this.winningNumbers,
      bonusNumber: this.bonusNumber,
    });
    WinningStatsOutputView.displayModal();
    WinningStatsOutputView.displayWinningStats(winningStats);

    this.processRateOfReturn(this.purchaseAmount, winningStats);
  }

  processRateOfReturn(purchaseAmount, winningStats) {
    const prize = LOTTO_SYMBOL.PRIZE;
    const totalPrizeMoney = Object.keys(prize).reduce(
      (acc, cur) => acc + prize[cur] * winningStats[cur],
      0,
    );
    const rate = (totalPrizeMoney / purchaseAmount) * 100;
    const rateOfReturn = (Math.round(rate * 10) / 10).toFixed(1);

    RateOfReturnOutputView.displayRateOfReturn(rateOfReturn);
  }

  processRestart() {
    this.purchaseAmount = 0;
    this.lottoTickets = [];
    this.winningNumbers = [];
    this.bonusNumber = 0;
    PurchaseAmountOutputView.resetToInitialState();
    LottoTicketsOutputView.resetToInitialState();
    WinningNumbersOutputView.resetToInitialState();
    BonusNumberOutputView.resetToInitialState();
    WinningStatsOutputView.resetToInitialState();
    RateOfReturnOutputView.resetToInitialState();
  }
}
export default LottoWebController;
