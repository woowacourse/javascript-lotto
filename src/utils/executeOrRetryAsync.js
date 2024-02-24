import ERROR_MESSAGE from "../constants/error-messages.js";
import AppError from "./Error.js";

export default async function executeOrRetryAsync({
  asyncFn,
  handleError,
  retryLimit = 3,
}) {
  let attempts = 0;
  while (attempts < retryLimit) {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error.message);
      attempts += 1;
    }
  }
  throw new AppError(ERROR_MESSAGE.OVER_RETRY_LIMIT);
}
