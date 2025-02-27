import { ERROR } from "../constants/message.js";
import { LOTTO_NUMBER } from "../constants/lotto.js";
import { throwError } from "../utils/throwError.js";
import Validator from "./validator.js";

const validateBonusNumber = (enteredLottoNumbers, bonusNumber) => {
  Validator.empty(bonusNumber);
  Validator.number(bonusNumber);
  Validator.range(
    { min: LOTTO_NUMBER.MIN, max: LOTTO_NUMBER.MAX },
    bonusNumber
  );

  if (enteredLottoNumbers.includes(bonusNumber)) {
    throwError(ERROR.INCLUDE);
  }
};

export default validateBonusNumber;
