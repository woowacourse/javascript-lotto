import { ERROR_PREFIX } from "../constants/message.js";

export const throwError = (message) => {
  throw new Error(`${ERROR_PREFIX} ${message}`);
};
