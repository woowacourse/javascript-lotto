import { Y_OR_NO_ERROR_MESSAGE } from "../../constants/constants.js";
import { reStartValidator } from "../validator/reStartValidator.js";
import runValidators from "../../utils/runValidators.js";

const validateYorN = (input) => {
  if (!reStartValidator.isYesOrNo(input)) {
    throw new Error(Y_OR_NO_ERROR_MESSAGE);
  }
};

const validateReStart= (input) =>
  runValidators([validateYorN], input);

export default validateReStart;
