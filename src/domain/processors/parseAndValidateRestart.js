import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Parser from "../../utils/Parser.js";
import Validator from "../../utils/Validator.js";

const parseAndValidateRestart = (input) => {
  if (Validator.isYesOrNo(input)) throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);

  const yesOrNo = Parser.yesOrNo(input);

  return yesOrNo;
};

export default parseAndValidateRestart;
