import Validator from "../utils/Validator";
import LOTTO_SYSTEM from "../constants/lottoSystem";
import { ERROR_MESSAGE } from "../constants/message";

class Lotto {
  _numbers;

  constructor(numbers) {
    if (!this.#isValidLottoNumbers(numbers))
      throw new Error(ERROR_MESSAGE.invalidNumbers);

    this._numbers = numbers;
  }

  get numbers() {
    return [...this._numbers];
  }

  #isValidLottoNumbers(lottoNumbers) {
    const lottoCount = LOTTO_SYSTEM.lottoDigitCount;
    const lottoNumberType = "number";
    const lottoMinNumber = LOTTO_SYSTEM.lottoRangeMinimum;
    const lottoMaxNumber = LOTTO_SYSTEM.lottoRangeMaximum;

    return (
      Validator.checkArrayLengthSame(lottoNumbers, lottoCount) &&
      Validator.checkArrayElementType(lottoNumbers, lottoNumberType) &&
      Validator.checkArrayElementInteger(lottoNumbers) &&
      Validator.checkRangeNumbers(
        lottoNumbers,
        lottoMinNumber,
        lottoMaxNumber,
      ) &&
      Validator.checkIsUnique(lottoNumbers)
    );
  }
}

export default Lotto;
