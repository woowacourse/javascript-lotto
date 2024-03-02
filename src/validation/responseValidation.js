import { RESPONSE } from '../constants/input';
import { ERROR_MESSAGE } from '../constants/message';

const RestartResponseValidation = {
  validate(response = '') {
    const rightResponse = [RESPONSE.RESTART.YES, RESPONSE.RESTART.NO];
    if (!rightResponse.includes(response) || response === response.toUpperCase()) {
      throw new Error(`${ERROR_MESSAGE.PREFIX}${ERROR_MESSAGE.RESTART_RESPONSE}`);
    }
  },
};
export default RestartResponseValidation;
