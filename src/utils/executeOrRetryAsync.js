import ERROR_MESSAGE from '../constants/error-messages.js';

import AppError from './Error.js';

/* eslint-disable max-lines-per-function */
/* eslint-disable max-depth */
export default async function executeOrRetryAsync({ asyncFn, handleError, retryLimit = 10, attempts = 0 }) {
  try {
    return await asyncFn();
  } catch (error) {
    handleError(error.message);
    if (attempts < retryLimit) {
      const retryResult = await executeOrRetryAsync({
        asyncFn,
        handleError,
        retryLimit,
        attempts: attempts + 1,
      });
      return retryResult;
    }
    throw new AppError(ERROR_MESSAGE.OVER_RETRY_LIMIT);
  }
}
