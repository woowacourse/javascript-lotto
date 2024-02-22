import MESSAGE from '../constants/message';

const RestartResponseValidation = {
  validate(response = '') {
    if (response !== MESSAGE.RESPONSE.RESTART.YES && response !== MESSAGE.RESPONSE.RESTART.NO) {
      throw new Error(`${MESSAGE.ERROR.PREFIX} ${MESSAGE.RESTART_RESPONSE}`);
    }
  },
};
export default RestartResponseValidation;
