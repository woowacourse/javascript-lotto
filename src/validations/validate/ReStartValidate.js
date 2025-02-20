import { Y_OR_NO_ERROR_MESSAGE } from "../../constants/constants.js";
import { isYesOrNo } from "../validator/ReStartValidator.js";

export const validateYorN = (input) => {
  if (!isYesOrNo(input)) {
    throw new Error(Y_OR_NO_ERROR_MESSAGE);
  }
};