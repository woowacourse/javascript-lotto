import { ERROR_MESSAGE, RESPONSE_MESSAGE } from '../constants/message';

const RestartResponseValidation = {
  validate(response = '') {
    if (response !== RESPONSE_MESSAGE.RESTART.YES && response !== RESPONSE_MESSAGE.RESTART.NO) {
      throw new Error(`${ERROR_MESSAGE.PREFIX} ${RESPONSE_MESSAGE.RESTART_RESPONSE}`);
    }
  },
};
export default RestartResponseValidation;
