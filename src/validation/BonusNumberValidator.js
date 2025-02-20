import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import Validator from "./validator.js";

class BonusNumberValidator extends Validator {
  validateBonusNumber(enteredLottoNumbers, bonusNumber) {
    this.empty(bonusNumber);
    this.number(bonusNumber);
    this.range(bonusNumber);

    this.include(enteredLottoNumbers, bonusNumber);
  }

  include(enteredLottoNumbers, bonusNumber) {
    if (enteredLottoNumbers.includes(bonusNumber)) {
      throwError(ERROR.INCLUDE);
    }
  }
}

export default BonusNumberValidator;
