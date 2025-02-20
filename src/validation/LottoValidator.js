import { LOTTO_NUMBER } from "../constants/lotto.js";
import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import Validator from "./validator.js";

class LottoValidator extends Validator {
  validateLotto(lotto) {
    lotto.forEach((number) => {
      this.empty(number);
      this.number(number);
      this.range({ min: LOTTO_NUMBER.MIN, max: LOTTO_NUMBER.MAX }, number);
    });
    this.duplicate(lotto);
    this.checkLength(lotto);
  }

  duplicate(arr) {
    if (new Set(arr).size !== arr.length) {
      throwError(ERROR.DUPLICATE);
    }
  }

  checkLength(arr) {
    if (arr.length !== LOTTO_NUMBER.LENGTH) {
      throwError(ERROR.LENGTH);
    }
  }
}

export default LottoValidator;
