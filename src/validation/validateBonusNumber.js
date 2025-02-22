import { validateEmpty, validateNumber, validateRange } from "./validate.js";
import { throwError } from "../utils/throwError.js";
import { ERROR } from "../constants/message.js";

const validateBonusNumber = ({ enterdLottoNumbers, bonusLottoNumber }) => {
  validateEmpty(bonusLottoNumber);
  validateNumber(bonusLottoNumber);
  validateRange({ min: 1, max: 45 }, bonusLottoNumber);
  validateInclude(enterdLottoNumbers, bonusLottoNumber);
};

const validateInclude = (arr, number) => {
  if (arr.includes(number)) {
    throwError(ERROR.INCLUDE);
  }
};

export default validateBonusNumber;
