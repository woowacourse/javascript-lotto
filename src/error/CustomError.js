import { PREFIX } from "./ErrorMessage.js";

class CustomError extends Error {
  constructor(message) {
    super(`${PREFIX.error} ${message}`);
  }
}

export default CustomError;
