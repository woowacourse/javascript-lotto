import LottoTicket from '../../domain/LottoTicket';
import WinningStatsMaker from '../../domain/WinningStatsMaker';
import ConsoleInputView from '../view/ConsoleInputView';
import ConsoleOutputView from '../view/ConsoleOutputView';
import PurchaseAmountValidator from '../../validator/PurchaseAmountValidator';
import WinningNumbersValidator from '../../validator/WinningNumbersValidator';
import BonusNumberValidator from '../../validator/BonusNumberValidator';
import RestartOrExitValidator from '../../validator/RestartOrExitValidator';
import RepeatUntilSuccess from '../utils/RepeatUntilSuccess';
import {
  PURCHASE_AMOUNT_INPUT_ERROR,
  RESTART_OR_EXIT_INPUT_ERROR,
  WINNING_NUMBER_INPUT_ERROR,
} from '../../constant/messages';
import { GAME_SYMBOL, LOTTO_SYMBOL, PURCHASE_SYMBOL } from '../../constant/symbols';

class LottoConsoleController {
  #PRIZE = LOTTO_SYMBOL.PRIZE;

  async start() {
    const purchaseAmount = await RepeatUntilSuccess([this.processPurchaseAmount, this]);
    const lottoTickets = this.processLottoTicket(purchaseAmount);
    const winningNumbers = await RepeatUntilSuccess([this.processWinningNumbers, this]);
    const bonusNumber = await RepeatUntilSuccess([this.processBonusNumber, this], winningNumbers);
    const winningStats = await this.processWinningStatst(lottoTickets, {
      winningNumbers,
      bonusNumber,
    });
    this.processRateOfReturn(purchaseAmount, winningStats);
    const restart = await RepeatUntilSuccess([this.processRestartOrExit, this]);
    if (restart === GAME_SYMBOL.RESTART) this.start();
  }

  async processPurchaseAmount() {
    const inputValue = await ConsoleInputView.readPurchaseAmount();
    const purchaseAmount = Number(inputValue);
    this.validatePurchaseAmount(purchaseAmount);
    ConsoleOutputView.printPurchaseCount(purchaseAmount / PURCHASE_SYMBOL.UNIT);
    return purchaseAmount;
  }

  validatePurchaseAmount(inputValue) {
    if (!PurchaseAmountValidator.isNumber(inputValue))
      throw new Error(PURCHASE_AMOUNT_INPUT_ERROR.TYPE);
    if (!PurchaseAmountValidator.isValidUnit(inputValue))
      throw new Error(PURCHASE_AMOUNT_INPUT_ERROR.UNIT);
    if (!PurchaseAmountValidator.isValidMinRange(inputValue))
      throw new Error(PURCHASE_AMOUNT_INPUT_ERROR.RANGE);
  }

  processLottoTicket(purchaseAmount) {
    const lottoTicketCount = purchaseAmount / PURCHASE_SYMBOL.UNIT;
    const tickets = [];
    Array.from({ length: lottoTicketCount }).forEach(() => {
      tickets.push(new LottoTicket().publishTicket());
    });
    ConsoleOutputView.printLottoTickets(tickets);
    return tickets;
  }

  async processWinningNumbers() {
    const inputValue = await ConsoleInputView.readWinningNumbers();
    const winningNumbers = inputValue.split(',').map((value) => Number(value));
    this.validateWinningNumbers(winningNumbers);
    return winningNumbers;
  }

  validateWinningNumbers(inputValue) {
    if (!WinningNumbersValidator.isValidCount(inputValue))
      throw new Error(WINNING_NUMBER_INPUT_ERROR.LENGTH);
    if (!WinningNumbersValidator.isNumber(inputValue))
      throw new Error(WINNING_NUMBER_INPUT_ERROR.TYPE);
    if (!WinningNumbersValidator.isUniqueNumbers(inputValue))
      throw new Error(WINNING_NUMBER_INPUT_ERROR.UNIQUE);
    if (!WinningNumbersValidator.isValidRange(inputValue))
      throw new Error(WINNING_NUMBER_INPUT_ERROR.RANGE);
  }

  async processBonusNumber(winningNumbers) {
    const inputValue = await ConsoleInputView.readBonusNumber();
    const bonusNumber = Number(inputValue);
    this.validateBonusNumber(bonusNumber, winningNumbers);
    return bonusNumber;
  }

  validateBonusNumber(inputValue, winningNumbers) {
    if (!BonusNumberValidator.isNumber(inputValue)) throw new Error(BONUS_NUMBER_INPUT_ERROR.TYPE);
    if (!BonusNumberValidator.isValidRange(inputValue))
      throw new Error(BONUS_NUMBER_INPUT_ERROR.RANGE);
    if (!BonusNumberValidator.isUniqueBonusNumber(inputValue, winningNumbers))
      throw new Error(BONUS_NUMBER_INPUT_ERROR.UNIQUE);
  }

  async processWinningStatst(lottoTickets, { winningNumbers, bonusNumber }) {
    const winningStats = new WinningStatsMaker().makeWinningStats(lottoTickets, {
      winningNumbers,
      bonusNumber,
    });
    ConsoleOutputView.printWinningStats(winningStats);
    return winningStats;
  }

  processRateOfReturn(purchaseAmount, matchStats) {
    const totalPrizeMoney = Object.keys(this.#PRIZE).reduce(
      (acc, cur) => acc + this.#PRIZE[cur] * matchStats[cur],
      0,
    );
    const rate = (totalPrizeMoney / purchaseAmount) * 100;
    const rateOfReturn = (Math.round(rate * 10) / 10).toFixed(1);
    ConsoleOutputView.printRateOfReturn(rateOfReturn);
  }

  async processRestartOrExit() {
    const inputValue = await ConsoleInputView.readRestartOrExit();
    this.validateRestartOrExit(inputValue);
    return inputValue;
  }

  validateRestartOrExit(inputValue) {
    if (!RestartOrExitValidator.isValidRestartOrExitKeyword(inputValue))
      throw new Error(RESTART_OR_EXIT_INPUT_ERROR.RESTART_OR_EXIT_INPUT_ERROR);
  }
}

export default LottoConsoleController;
