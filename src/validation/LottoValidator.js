import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import Validator from "./validator.js";

class LottoValidator extends Validator {
  validateLotto(lotto) {
    lotto.forEach((number) => {
      this.empty(number);
      this.number(number);
      this.range(number);
    });
    this.duplicate(lotto);
  }

  duplicate(arr) {
    if (new Set(arr).size !== arr.length) {
      throwError(ERROR.DUPLICATE);
    }
  }
}

export default LottoValidator;
