import Lotto from "./Lotto";
import Validator from "../utils/Validator";
import Random from "../utils/Random";
import LOTTO_SYSTEM from "../constants/lottoSystem";
import { ERROR_MESSAGE } from "../constants/message";

class LottoStore {
  calculateLottoCount(purchaseAmount) {
    if (!this.#isValidPurchaseAmount(purchaseAmount))
      throw new Error(ERROR_MESSAGE.invalidPurchaseAmount);

    const lottoPrice = 1000;

    return purchaseAmount / lottoPrice;
  }

  generateLottosNumbers(lottoCount) {
    if (!this.#isValidLottoCount(lottoCount))
      throw new Error(ERROR_MESSAGE.invalidLottoCount);

    return Array.from({ length: lottoCount }).map(() =>
      this.#generateLottoNumbers(),
    );
  }

  issueLottos(sixNumbersArray) {
    // 2차원 배열의 이름 리뷰어는 어떻게 생각하시나요 ??
    if (!this.#isValidSixNumbersArray(sixNumbersArray))
      throw new Error(ERROR_MESSAGE.invalidSixNumbersArray);

    return sixNumbersArray.map((sixNumbers) => new Lotto(sixNumbers));
  }

  #generateLottoNumbers() {
    const { lottoRangeMinimum, lottoRangeMaximum, lottoDigitCount } =
      LOTTO_SYSTEM;

    return Random.generateUniqueRandomNumbersInRange(
      lottoRangeMinimum,
      lottoRangeMaximum,
      lottoDigitCount,
    );
  }

  #isValidSixNumbersArray(sixNumbersArray) {
    return (
      Validator.checkIsArray(sixNumbersArray) &&
      Validator.checkArrayNotEmpty(sixNumbersArray) &&
      Validator.checkArrayElementArray(sixNumbersArray)
    );
  }

  #isValidPurchaseAmount(purchaseAmount) {
    const purchaseAmountType = "number";
    const lottoPrice = 1000;
    const minPurchaseAmount = 1000;
    const maxPurchaseAmount = 100000;

    return (
      Validator.checkIsNotNaN([purchaseAmount]) &&
      Validator.checkArrayElementType([purchaseAmount], purchaseAmountType) &&
      Validator.checkIsDivisible(purchaseAmount, lottoPrice) &&
      Validator.checkRangeNumbers(
        [purchaseAmount],
        minPurchaseAmount,
        maxPurchaseAmount,
      )
    );
  }

  #isValidLottoCount(lottoCount) {
    const lottoCountType = "number";
    const minLottoCount = 1;
    const maxLottoCount = 100;

    return (
      Validator.checkArrayElementType([lottoCount], lottoCountType) &&
      Validator.checkArrayElementInteger([lottoCount]) &&
      Validator.checkRangeNumbers([lottoCount], minLottoCount, maxLottoCount)
    );
  }
}

export default LottoStore;
