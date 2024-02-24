import { RESPONSE } from '../constants/input';
import MESSAGE, { ERROR_MESSAGE } from '../constants/message';

const RestartResponseValidation = {
  validate(response = '') {
    if (response !== RESPONSE.RESTART.YES && response !== RESPONSE.RESTART.NO) {
      throw new Error(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.RESTART_RESPONSE}`);
    }
  },
};
export default RestartResponseValidation;
