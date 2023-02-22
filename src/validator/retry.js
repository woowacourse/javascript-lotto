import { GAME } from '../constants/lottoConstants.js';
import { CustomError, ERROR_CODE } from '../utils/Error.js';

export default function checkRetryFormat(command) {
  if (command !== GAME.RETRY && command !== GAME.EXIT) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, command);
  }
}
