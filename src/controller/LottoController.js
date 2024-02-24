import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import WinningNumbersValidator from '../validator/WinningNumbersValidator';
import BonusNumberValidator from '../validator/BonusNumberValidator';
import InputView from '../view/InputView';
import RetryOrEnd from '../utils/RetryOrEnd';
import LottoTicket from '../domain/LottoTicket';
import OutputView from '../view/OutputView';
import WinningStatsMaker from '../domain/WinningStatsMaker';
import RestartOrExitValidator from '../validator/RestartOrExitValidator';
import {
  BONUS_NUMBER_INPUT_ERROR,
  PURCHASE_AMOUT_INPUT_ERROR,
  RESTART_OR_EXIT_INPUT_ERROR,
  WINNING_NUMBER_INPUT_ERROR,
} from '../constant/messages';
import { GAME_SYMBOL, LOTTO_SYMBOL, PURCHASE_SYMBOL } from '../constant/symbols';

class LottoController {
  #PRIZE = LOTTO_SYMBOL.PRIZE;

  async start() {
    const purchaseAmount = await RetryOrEnd([this.processPurchaseAmount, this]);
    const lottoTickets = this.processLottoTicket(purchaseAmount);
    const winningNumbers = await RetryOrEnd([this.processWinningNumbers, this]);
    const bonusNumber = await RetryOrEnd([this.processBonusNumber, this], winningNumbers);
    const winningStats = await this.processWinningStatst(lottoTickets, {
      winningNumbers,
      bonusNumber,
    });
    this.processRateOfReturn(purchaseAmount, winningStats);
    const restart = await RetryOrEnd([this.processRestartOrExit, this]);
    if (restart === GAME_SYMBOL.RESTART) this.start();
  }

  async processPurchaseAmount() {
    const inputValue = await InputView.readPurchaseAmount();
    const purchaseAmount = Number(inputValue);
    this.validatePurchaseAmount(purchaseAmount);
    OutputView.printPurchaseCount(purchaseAmount / PURCHASE_SYMBOL.UNIT);
    return purchaseAmount;
  }

  validatePurchaseAmount(inputValue) {
    if (!PurchaseAmountValidator.isNumber(inputValue))
      throw new Error(PURCHASE_AMOUT_INPUT_ERROR.TYPE);
    if (!PurchaseAmountValidator.isValidUnit(inputValue))
      throw new Error(PURCHASE_AMOUT_INPUT_ERROR.UNIT);
    if (!PurchaseAmountValidator.isValidMinRange(inputValue))
      throw new Error(PURCHASE_AMOUT_INPUT_ERROR.RANGE);
  }

  processLottoTicket(purchaseAmount) {
    const lottoTicketCount = purchaseAmount / PURCHASE_SYMBOL.UNIT;
    const tickets = [];
    Array.from({ length: lottoTicketCount }).forEach(() => {
      tickets.push(new LottoTicket().publishTicket());
    });
    OutputView.printLottoTickets(tickets);
    return tickets;
  }

  async processWinningNumbers() {
    const inputValue = await InputView.readWinningNumbers();
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
    const inputValue = await InputView.readBonusNumber();
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
    OutputView.printWinningStats(winningStats);
    return winningStats;
  }

  processRateOfReturn(purchaseAmount, matchStats) {
    const totalPrizeMoney = Object.keys(this.#PRIZE).reduce(
      (acc, cur) => acc + this.#PRIZE[cur] * matchStats[cur],
      0,
    );
    const rate = (totalPrizeMoney / purchaseAmount) * 100;
    const rateOfReturn = (Math.round(rate * 10) / 10).toFixed(1);
    OutputView.printRateOfReturn(rateOfReturn);
  }

  async processRestartOrExit() {
    const inputValue = await InputView.readRestartOrExit();
    this.validateRestartOrExit(inputValue);
    return inputValue;
  }

  validateRestartOrExit(inputValue) {
    if (!RestartOrExitValidator.isValidRestartOrExitKeyword(inputValue))
      throw new Error(RESTART_OR_EXIT_INPUT_ERROR.RESTART_OR_EXIT_INPUT_ERROR);
  }
}

export default LottoController;
