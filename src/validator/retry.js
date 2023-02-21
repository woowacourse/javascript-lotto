import { EXIT, RETRY } from '../constants/values.js';
import { CustomError, ERROR_CODE } from '../utils/Error.js';

export default function checkRetryFormat(command) {
  if (command !== RETRY && command !== EXIT) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, command);
  }
}
