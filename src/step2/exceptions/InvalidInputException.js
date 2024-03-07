import { ERROR_MESSAGES } from "../constants/lotto";

class InvalidInputException extends Error {
  constructor(message) {
    super(message);
  }
}

export default InvalidInputException;
