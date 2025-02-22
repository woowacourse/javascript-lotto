import { ERROR } from "../constants/message.js";
import { PRICE } from "../constants/price.js";
import { throwError } from "../utils/throwError.js";
import { validateEmpty, validateNumber, validateRange } from "./validate.js";

const validatePrice = (price) => {
  validateEmpty(price);
  validateNumber(price);
  validateRange({ min: PRICE.MIN, max: PRICE.MAX }, price);
  checkThousandUnit(price);
};

const checkThousandUnit = (price) => {
  if (price % PRICE.UNIT !== 0) {
    throwError(ERROR.UNIT);
  }
};

export default validatePrice;
