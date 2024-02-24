import { GAME_SYMBOL } from '../constant/symbols';

const RestartOrExitValidator = {
  isValidRestartOrExitKeyword(inputValue) {
    return inputValue === GAME_SYMBOL.RESTART || inputValue == GAME_SYMBOL.EXIT;
  },
};

export default RestartOrExitValidator;
