import ERROR_MESSAGE from "../constants/error-messages.js";
import AppError from "./Error.js";

export default async function executeOrRetryAsync({
  asyncFn,
  handleError,
  retryLimit = 10,
  attempts = 0,
}) {
  try {
    return await asyncFn();
  } catch (error) {
    handleError(error.message);
    if (attempts < retryLimit) {
      return await executeOrRetryAsync({
        asyncFn,
        handleError,
        retryLimit,
        attempts: attempts + 1,
      });
    } else {
      throw new AppError(ERROR_MESSAGE.OVER_RETRY_LIMIT);
    }
  }
}
