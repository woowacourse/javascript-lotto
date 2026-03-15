import { RETRY_ANSWER } from "../constants/config.js";
import { ERROR_MESSAGE } from "../constants/message.js";

export function isRetryAnswerValid(answer) {
  if (answer !== RETRY_ANSWER.YES && answer !== RETRY_ANSWER.NO) {
    throw new Error(ERROR_MESSAGE.RETRY.INVALID_RETRY);
  }

  return answer === RETRY_ANSWER.YES;
}
