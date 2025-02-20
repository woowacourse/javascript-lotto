import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";

class Validator {
  validate(input) {
    this.empty(input);
    this.range({ min, max }, input);
    this.number(input);
  }

  empty(input) {
    if (input === "") {
      throwError(ERROR.EMPTY);
    }
  }

  range({ min, max }, number) {
    if (number < min || number > max) {
      throwError(ERROR.INVALID_RANGE);
    }
  }

  number(input) {
    if (isNaN(Number(input))) {
      throwError(ERROR.NOT_NUMBER);
    }
  }
}

export default Validator;
