import {
  LOTTO_NUMBER_LENGTH,
  LOTTO_NUMBER_RANGE,
  LOTTO_PRICE,
} from "../constants/lotto-constants";
import Lotto from "../domain/Lotto";
import createUniqueNumbersInRange from "../utils/createUniqueNumbersInRange";
import executeOrRetryAsync from "../utils/executeOrRetryAsync";
import CommonValidator from "../validator/CommonValidator";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator";
import InputView from "../view/InputView";
import OutputView from "../view/OutputView";

const LottoPurchaseController = () => {
  const readAndValidatePurchaseAmount = async () => {
    const purchaseAmountInput = await InputView.readPurchaseAmount();
    CommonValidator.validate(purchaseAmountInput);
    purchaseAmountValidator.validate(purchaseAmountInput);

    return Number(purchaseAmountInput);
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

  return {
    processPurchaseLotto,
  };
};

export default LottoPurchaseController;
