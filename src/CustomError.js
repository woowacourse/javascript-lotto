import { ERROR_PREFIX } from "./constants/index.js";

class CustomError extends Error {
  constructor(message) {
    super(`${ERROR_PREFIX} ${message}`);
    alert(`${message}`);
  }
}

export default CustomError;
