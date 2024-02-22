import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import WinningNumberValidator from '../validator/WinningNumberValidator';
import BonusNumberValidator from '../validator/BonusNumberValidator';
import InputView from '../view/InputView';
import Console from '../utils/Console';
import LottoTicket from '../domain/LottoTicket';
import OutputView from '../view/OutputView';
import LottoMatcher from '../domain/LottoMatcher';
import RateOfReturnCalculator from '../utils/RateOfReturnCalculator';
import RestartOrExitValidator from '../validator/RestartOrExitValidator';

class LottoController {
  #winningNumber;

  async start() {
    const purchaseAmount = await Console.errorHandler(this.setPurchaseAmount, this);
    const purchaseCount = purchaseAmount / 1000;
    OutputView.printPurchaseCount(purchaseCount);
    const lottoTickets = this.setLottoTicket(purchaseAmount);
    OutputView.printLottoTickets(lottoTickets);
    this.#winningNumber = await Console.errorHandler(this.setWinningNumber, this);
    const bonusNumber = await Console.errorHandler(this.setBonusNumber, this);
    const matchingResult = await this.setMatchingResult(lottoTickets, [
      this.#winningNumber,
      bonusNumber,
    ]);
    OutputView.printWinningStats(matchingResult);
    const rateOfReturn = RateOfReturnCalculator(purchaseAmount, matchingResult);
    OutputView.printRateOfReturn(rateOfReturn);

    const restart = await Console.errorHandler(this.setRestartOrExit, this);
    if (restart === 'y') this.start();
  }

  async setPurchaseAmount() {
    const inputValue = await InputView.readPurchaseAmount();
    const convertedInputValue = Number(inputValue);
    this.validatePurchaseAmount(convertedInputValue);
    return convertedInputValue;
  }

  validatePurchaseAmount(inputValue) {
    if (PurchaseAmountValidator.isNotNumber(inputValue))
      throw new Error('[ERROR] 구매 금액은 숫자여야 합니다.');
    if (PurchaseAmountValidator.isNotUnit(inputValue))
      throw new Error('[ERROR] 구매 금액은 1000원 단위여야 합니다.');
    if (PurchaseAmountValidator.isNotMinRange(inputValue))
      throw new Error('[ERROR] 최소 구매 금액은 1000원 입니다');
  }

  setLottoTicket(purchaseAmount) {
    const lottoTicketCount = purchaseAmount / 1000;
    const tickets = [];
    Array.from({ length: lottoTicketCount }).forEach(() => {
      tickets.push(new LottoTicket().ticket);
    });
    return tickets;
  }

  async setWinningNumber() {
    const inputValue = await InputView.readWinningNumber();
    const convertedInputValue = inputValue.split(',').map((value) => Number(value));
    this.validateWinningNumber(convertedInputValue);
    return convertedInputValue;
  }

  validateWinningNumber(inputValue) {
    if (WinningNumberValidator.isNotValidCount(inputValue))
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    if (WinningNumberValidator.isNotNumber(inputValue))
      throw new Error('[ERROR] 로또 번호는 숫자여야 합니다.');
    if (WinningNumberValidator.isNotUnique(inputValue))
      throw new Error('[ERROR] 로또 번호는 중복되지 않아야 합니다.');
    if (WinningNumberValidator.isNotRange(inputValue))
      throw new Error('[ERROR] 로또 번호의 숫자 범위는 1에서 45까지의 수입니다.');
  }

  async setBonusNumber() {
    const inputValue = await InputView.readBonusNumber();
    const convertedInputValue = Number(inputValue);
    this.validateBonusNumber(convertedInputValue);
    return convertedInputValue;
  }

  validateBonusNumber(inputValue) {
    if (BonusNumberValidator.isNotInteger(inputValue))
      throw new Error('[ERROR] 보너스 번호는 숫자여야 합니다.');
    if (BonusNumberValidator.isInvalidRange(inputValue))
      throw new Error('[ERROR] 보너스 번호는 1 이상 45 이하여야 합니다.');
    if (BonusNumberValidator.isDuplicatedWinningNumber(inputValue, this.#winningNumber))
      throw new Error('[ERROR] 보너스 번호는 중복되지 않아야 합니다.');
  }

  async setMatchingResult(lottoTickets, [winningNumber, bonusNumber]) {
    const matchingResult = new LottoMatcher(lottoTickets, [winningNumber, bonusNumber])
      .matchingResult;
    return matchingResult;
  }

  async setRestartOrExit() {
    const inputValue = await InputView.readRestartOrExit();
    return inputValue;
  }
}

export default LottoController;
