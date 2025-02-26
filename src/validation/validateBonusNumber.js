import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import Validator from "./validator.js";

const validateBonusNumber = (enteredLottoNumbers, bonusNumber) => {
  Validator.empty(bonusNumber);
  Validator.number(bonusNumber);
  Validator.range(bonusNumber);

  if (enteredLottoNumbers.includes(bonusNumber)) {
    throwError(ERROR.INCLUDE);
  }
};

export default validateBonusNumber;
