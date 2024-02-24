import { LOTTO_NUMBER_LENGTH, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/lotto-constants.js';
import Lotto from '../domain/Lotto.js';
import createUniqueNumbersInRange from '../utils/createUniqueNumbersInRange.js';
import executeOrRetryAsync from '../utils/executeOrRetryAsync.js';
import CommonValidator from '../validator/CommonValidator.js';
import purchaseAmountValidator from '../validator/PurchaseAmountValidator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

/* eslint-disable max-lines-per-function */
// LottoPurchaseController 내부 함수들은 15줄을 넘지 않습니다.
const lottoPurchaseController = () => {
  const readAndValidatePurchaseAmount = async () => {
    const purchaseAmountInput = await InputView.readPurchaseAmount();
    CommonValidator.validate(purchaseAmountInput);
    purchaseAmountValidator.validate(purchaseAmountInput);

    return Number(purchaseAmountInput);
  };

  const createLottoTickets = (purchaseAmount) => {
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
  };

  const displayLottoTickets = (lottoTickets) => {
    lottoTickets.forEach((lotto) => {
      OutputView.printLottoNumber(lotto.getNumbers());
    });
  };

  const processPurchaseLotto = async () => {
    const purchaseAmount = await executeOrRetryAsync({
      asyncFn: readAndValidatePurchaseAmount,
      handleError: console.log,
    });
    OutputView.printPurchaseMessage(purchaseAmount);
    const lottoTickets = createLottoTickets(purchaseAmount);
    displayLottoTickets(lottoTickets);
    return lottoTickets;
  };

  return {
    processPurchaseLotto,
  };
};

export default lottoPurchaseController;
