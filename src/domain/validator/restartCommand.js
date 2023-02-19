const { ERROR_MESSAGE } = require('../../constant/message');
const { COMMAND } = require('../../constant/setting');

const isValidRestartCommand = (command) => command === COMMAND.YES || command === COMMAND.NO;

const validateRestartCommand = (command) => {
  if (!isValidRestartCommand(command)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTART_COMMAND);
  }
};

module.exports = validateRestartCommand;
