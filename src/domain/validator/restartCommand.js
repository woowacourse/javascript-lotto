import { ERROR_MESSAGE } from '../../constants/error';
import { COMMAND } from '../../constants/setting';

const isValidRestartCommand = (command) => command === COMMAND.YES || command === COMMAND.NO;

const validateRestartCommand = (command) => {
  if (!isValidRestartCommand(command)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTART_COMMAND);
  }
};

export default validateRestartCommand;
