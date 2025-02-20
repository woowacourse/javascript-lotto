import { ERROR } from "../constants/message.js";
import { PRICE } from "../constants/price.js";
import { throwError } from "../utils/throwError.js";
import Validator from "./validator.js";

class PriceValidator extends Validator {
  validatePrice(price) {
    this.empty(price);
    this.number(price);
    this.range({ min: PRICE.MIN, max: PRICE.MAX }, price);
    this.checkThousandUnit(price);
  }

  checkThousandUnit(price) {
    if (price % PRICE.UNIT !== 0) {
      throwError(ERROR.UNIT);
    }
  }
}

export default PriceValidator;
