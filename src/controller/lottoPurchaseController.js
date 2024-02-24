import { LOTTO_NUMBER_LENGTH, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/lotto-constants.js';
import Lotto from '../domain/lotto.js';
import createUniqueNumbersInRange from '../utils/createUniqueNumbersInRange.js';
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

  #createLottoTickets(purchaseAmount) {
    return Array.from(
      { length: purchaseAmount / LOTTO_PRICE },
      () =>
        new Lotto(
          createUniqueNumbersInRange({
            start: LOTTO_NUMBER_RANGE.MIN,
            end: LOTTO_NUMBER_RANGE.MAX,
            count: LOTTO_NUMBER_LENGTH,
          }),
        ),
    );
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
    const lottoTickets = this.#createLottoTickets(purchaseAmount);
    this.#displayLottoTickets(lottoTickets);
    return lottoTickets;
  }
}

export default LottoPurchaseController;
