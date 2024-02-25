import { ERROR_MESSAGES } from "../constants/message";

class InvalidInputException extends Error {
  constructor(message) {
    super(`${ERROR_MESSAGES.prefix} ${message}`);
  }
}

export default InvalidInputException;
