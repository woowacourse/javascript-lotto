import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Validator from "../../utils/Validator.js";
const validateRestart = (input) => {
  if (Validator.isYesOrNo(input)) throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);

  if (Validator.isYes(input)) {
    return true;
  }
  if (Validator.isNo(input)) {
    return false;
  }
};

export default validateRestart;
