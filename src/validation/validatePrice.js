import { ERROR } from "../constants/message.js";
import { PRICE } from "../constants/price.js";
import { throwError } from "../utils/throwError.js";
import Validator from "./validator.js";

const validatePrice = (price) => {
  Validator.empty(price);
  Validator.number(price);
  Validator.range({ min: PRICE.MIN, max: PRICE.MAX }, price);
  if (price % PRICE.UNIT !== 0) {
    throwError(ERROR.UNIT);
  }
};

export default validatePrice;
