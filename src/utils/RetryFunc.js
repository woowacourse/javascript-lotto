import ERROR_MESSAGE from "../constants/error.js";
import { MAX_RETRY } from "../constants/option.js";
import OutputView from "../view/OutputView.js";

const RetryFunc = {
  async executeOrRetryAsync(asyncFn, retry) {
    try {
      const result = await asyncFn();
      return result;
    } catch (error) {
      OutputView.printError(error.message);
      return this.executeUntillMaxTry(asyncFn, retry + 1);
    }
  },

  executeUntillMaxTry(asyncFn, retry = 0) {
    if (retry > MAX_RETRY) {
      throw new Error(ERROR_MESSAGE.MAX_RETRY_EXCEEDED);
    }
    return this.executeOrRetryAsync(asyncFn, retry);
  },
};
export default RetryFunc;
