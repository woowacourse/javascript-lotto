import Condition from '../constants/Condition';
import ERROR from '../constants/ErrorMessage';

const { RESTART_OPTION } = Condition;

const RestartValidator = {
  validateOptionCharacter(restartOption) {
    if (restartOption !== RESTART_OPTION.RESTART && restartOption !== RESTART_OPTION.EXIT) {
      throw new Error(ERROR.OPTION_CHARACTER);
    }
  },
};

export default RestartValidator;
