import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import WinningNumberValidator from '../validator/WinningNumberValidator';
import InputView from '../view/InputView';
import Console from '../utils/Console';
import LottoTicket from '../domain/LottoTicket';
import OutputView from '../view/OutputView';

class LottoController {
  async start() {
    const purchaseAmount = await Console.errorHandler(this.setPurchaseAmount, this);
    const purchaseCount = purchaseAmount / 1000;
    OutputView.printPurchaseCount(purchaseCount);
    const lottoTickets = this.setLottoTicket(purchaseAmount);
    OutputView.printLottoTickets(lottoTickets);

    const winningNumber = await Console.errorHandler(this.setWinningNumber, this);
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
}

export default LottoController;
