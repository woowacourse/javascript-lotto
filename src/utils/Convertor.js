import { GameControlStaticValue } from '../constants/Constants.js';

const Convertor = {
  stringifyLotto(lotto) {
    return `[${lotto.join(GameControlStaticValue.PRINT_SEPARATOR)}]`;
  },
};

export default Convertor;
