import Condition from '../constants/Condition';
import Message from '../constants/Message';

const { RESTART_OPTION } = Condition;
const { ERROR } = Message;

const RestartOptionValidator = {
  validateCharacter(restartOption) {
    if (
      restartOption.toLowerCase() !== RESTART_OPTION.RESTART &&
      restartOption.toLowerCase() !== RESTART_OPTION.EXIT
    ) {
      throw new Error(ERROR.OPTION_CHARACTER);
    }
  },
};

export default RestartOptionValidator;
