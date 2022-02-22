import { isValidNumber, isValidLength } from "../utils/validator";
import { ERROR_MESSAGE } from "../constants/errorMessage";

class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  static create(lottoNumbers) {
    if (isValidNumber(lottoNumbers) && isValidLength(lottoNumbers)) {
      return new Lotto(lottoNumbers);
    }
    throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_IS_INVALIDATE);
  }

  lottoScore(winNumber) {}
}

export default Lotto;
