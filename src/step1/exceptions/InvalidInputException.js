import { ERROR_MESSAGES } from "../constants/message.js";

class InvalidInputException extends Error {
  constructor(message) {
    super(`${ERROR_MESSAGES.prefix} ${message}`);
  }
}

export default InvalidInputException;
