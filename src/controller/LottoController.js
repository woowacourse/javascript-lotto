import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import WinningNumbersValidator from '../validator/WinningNumbersValidator';
import BonusNumberValidator from '../validator/BonusNumberValidator';
import InputView from '../view/InputView';
import RetryOrEnd from '../utils/RetryOrEnd';
import LottoTicket from '../domain/LottoTicket';
import OutputView from '../view/OutputView';
import LottoMatcher from '../domain/LottoMatcher';
import RestartOrExitValidator from '../validator/RestartOrExitValidator';

class LottoController {
  #PRIZE = {
    1: 2000000000,
    2: 30000000,
    3: 1500000,
    4: 50000,
    5: 5000,
  };

  async start() {
    const purchaseAmount = await RetryOrEnd([this.processPurchaseAmount, this]);
    const lottoTickets = this.processLottoTicket(purchaseAmount);
    const winningNumbers = await RetryOrEnd([this.processWinningNumbers, this]);
    const bonusNumber = await RetryOrEnd([this.processBonusNumber, this], winningNumbers);
    const matchingResult = await this.processMatchingResult(lottoTickets, [
      winningNumbers,
      bonusNumber,
    ]);
    this.processRateOfReturn(purchaseAmount, matchingResult);
    const restart = await RetryOrEnd([this.processRestartOrExit, this]);
    if (restart === 'y') this.start();
  }

  async processPurchaseAmount() {
    const inputValue = await InputView.readPurchaseAmount();
    const purchaseAmount = Number(inputValue);
    this.validatePurchaseAmount(purchaseAmount);
    OutputView.printPurchaseCount(purchaseAmount / 1000);
    return purchaseAmount;
  }

  validatePurchaseAmount(inputValue) {
    if (PurchaseAmountValidator.isNotNumber(inputValue))
      throw new Error('[ERROR] 구매 금액은 숫자여야 합니다.');
    if (PurchaseAmountValidator.isNotUnit(inputValue))
      throw new Error('[ERROR] 구매 금액은 1000원 단위여야 합니다.');
    if (PurchaseAmountValidator.isNotMinRange(inputValue))
      throw new Error('[ERROR] 최소 구매 금액은 1000원 입니다');
  }

  processLottoTicket(purchaseAmount) {
    const lottoTicketCount = purchaseAmount / 1000;
    const tickets = [];
    Array.from({ length: lottoTicketCount }).forEach(() => {
      tickets.push(new LottoTicket().ticket);
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
    if (WinningNumbersValidator.isNotValidCount(inputValue))
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    if (WinningNumbersValidator.isNotNumber(inputValue))
      throw new Error('[ERROR] 로또 번호는 숫자여야 합니다.');
    if (WinningNumbersValidator.isNotUnique(inputValue))
      throw new Error('[ERROR] 로또 번호는 중복되지 않아야 합니다.');
    if (WinningNumbersValidator.isNotRange(inputValue))
      throw new Error('[ERROR] 로또 번호의 숫자 범위는 1에서 45까지의 수입니다.');
  }

  async processBonusNumber(winningNumbers) {
    const inputValue = await InputView.readBonusNumber();
    const bonusNumber = Number(inputValue);
    this.validateBonusNumber(bonusNumber, winningNumbers);
    return bonusNumber;
  }

  validateBonusNumber(inputValue, winningNumbers) {
    if (BonusNumberValidator.isNotInteger(inputValue))
      throw new Error('[ERROR] 보너스 번호는 숫자여야 합니다.');
    if (BonusNumberValidator.isInvalidRange(inputValue))
      throw new Error('[ERROR] 보너스 번호는 1 이상 45 이하여야 합니다.');
    if (BonusNumberValidator.isDuplicatedWinningNumbers(inputValue, winningNumbers))
      throw new Error('[ERROR] 보너스 번호는 중복되지 않아야 합니다.');
  }

  async processMatchingResult(lottoTickets, [winningNumber, bonusNumber]) {
    const matchingResult = new LottoMatcher(lottoTickets, [winningNumber, bonusNumber])
      .matchingResult;
    OutputView.printWinningStats(matchingResult);
    return matchingResult;
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
    if (RestartOrExitValidator.isNotRestartOrExitKeyword(inputValue))
      throw new Error('[ERROR] y(재시작) 또는 n(종료)을 입력하여야 합니다.');
  }
}

export default LottoController;
