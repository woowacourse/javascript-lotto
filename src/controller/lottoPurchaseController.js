import lottoMachine from '../domain/lottoMachine.js';
import executeOrRetryAsync from '../utils/executeOrRetryAsync.js';
import CommonValidator from '../validator/commonValidator.js';
import purchaseAmountValidator from '../validator/purchaseAmountValidator.js';
import inputView from '../view/inputView.js';
import outputView from '../view/outputView.js';

class LottoPurchaseController {
  async #readAndValidatePurchaseAmount() {
    const purchaseAmountInput = await inputView.readPurchaseAmount();
    CommonValidator.validate(purchaseAmountInput);
    purchaseAmountValidator.validate(purchaseAmountInput);

    return Number(purchaseAmountInput);
  }

  #displayLottoTickets(lottoTickets) {
    lottoTickets.forEach((lotto) => {
      outputView.printLottoNumber(lotto.getNumbers());
    });
  }

  async processPurchaseLotto() {
    const purchaseAmount = await executeOrRetryAsync({
      asyncFn: this.#readAndValidatePurchaseAmount,
      handleError: console.log,
    });
    outputView.printPurchaseMessage(purchaseAmount);
    const lottoTickets = lottoMachine.makeLottos(purchaseAmount);
    this.#displayLottoTickets(lottoTickets);
    return lottoTickets;
  }
}

export default LottoPurchaseController;
