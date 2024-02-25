import {
  PurchaseAmountValidator,
  WinningNumberValidator,
  BonusNumberValidator,
} from '../validators';
import { InputView, OutputView } from '../view';
import retryOrEnd from '../utils/RetryOrEnd';
import LottoTicket from '../domain/LottoTicket';
import LottoMatcher from '../domain/LottoMatcher';
import LottoCalculator from '../domain/LottoCalculator';
import { PURCHASE_AMOUNT } from '../constants';

class LottoController {
  constructor() {
    this.lottoTickets = [];
  }

  async start() {
    const purchaseAmount = await retryOrEnd([this.processPurchaseAmount, this]);
    this.processLottoTicket(purchaseAmount);

    const winningNumber = await retryOrEnd([this.processWinningNumber, this]);
    const bonusNumber = await retryOrEnd([this.processBonusNumber, this], winningNumber);
    const matchingResult = await this.processMatchingResult(winningNumber, bonusNumber);

    this.processRateOfReturn(purchaseAmount, matchingResult);
  }

  async processPurchaseAmount() {
    const purchaseAmount = Number(await InputView.readPurchaseAmount());
    PurchaseAmountValidator.validate(purchaseAmount);

    OutputView.printPurchaseCount(purchaseAmount / PURCHASE_AMOUNT.UNIT);
    return purchaseAmount;
  }

  processLottoTicket(purchaseAmount) {
    Array.from({ length: purchaseAmount / PURCHASE_AMOUNT.UNIT }).forEach(() => {
      this.lottoTickets.push(new LottoTicket());
    });
    OutputView.printLottoTickets(this.lottoTickets);
  }

  async processWinningNumber() {
    const winningNumber = await InputView.readWinningNumber();
    const parsedWinningNumbers = winningNumber.split(',').map((value) => Number(value));
    WinningNumberValidator.validate(parsedWinningNumbers);

    return parsedWinningNumbers;
  }

  async processBonusNumber(winningNumber) {
    const bonusNumber = Number(await InputView.readBonusNumber());
    BonusNumberValidator.validate(bonusNumber, winningNumber);

    return bonusNumber;
  }

  async processMatchingResult(winningNumber, bonusNumber) {
    const lottoMatcher = new LottoMatcher(winningNumber, bonusNumber);
    this.lottoTickets.forEach((lottoTicket) => {
      lottoMatcher.processMatches(lottoTicket.tickets);
    });

    OutputView.printWinningStats(lottoMatcher.matchingResult);
    return lottoMatcher.matchingResult;
  }

  processRateOfReturn(purchaseAmount, matchingResult) {
    const rateOfReturn = LottoCalculator.getRateOfReturn(purchaseAmount, matchingResult);

    OutputView.printRateOfReturn(rateOfReturn);
  }
}

export default LottoController;
