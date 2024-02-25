import { RESPONSE } from '../constants/input.js';
import { ERROR_MESSAGE } from '../constants/message.js';

const RestartResponseValidation = {
  validate(response = '') {
    const rightResponse = [RESPONSE.RESTART.YES, RESPONSE.RESTART.NO];
    if (!rightResponse.includes(response) || response === response.toUpperCase()) {
      throw new Error(`${ERROR_MESSAGE.PREFIX}${ERROR_MESSAGE.RESTART_RESPONSE}`);
    }
  },
};
export default RestartResponseValidation;
