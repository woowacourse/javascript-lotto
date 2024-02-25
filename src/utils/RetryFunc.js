import ERROR_MESSAGE from "../constants/error.js";
import { MAX_RETRY } from "../constants/option.js";
import OutputView from "../view/OutputView.js";

const RetryFunc = {
  async executeOrRetryAsync(asyncFn, retryCount) {
    try {
      const result = await asyncFn();
      return result;
    } catch (error) {
      OutputView.printError(error.message);
      return this.executeUntillMaxTry(asyncFn, retryCount + 1);
    }
  },

  executeUntillMaxTry(asyncFn, retryCount = 0) {
    if (retryCount > MAX_RETRY) {
      throw new Error(ERROR_MESSAGE.MAX_RETRY_EXCEEDED);
    }
    return this.executeOrRetryAsync(asyncFn, retryCount);
  },
};
export default RetryFunc;
