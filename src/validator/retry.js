import { GAME, ERROR } from '../constant/constants.js';

export default function checkRetryFormat(command) {
  if (command !== GAME.RETRY && command !== GAME.EXIT) {
    throw new Error(ERROR.INVALID_FORMAT);
  }
}
