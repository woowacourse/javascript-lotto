import { StaticValue } from '../constants/Constants.js';

const Convertor = {
  stringifyLotto(lotto) {
    return `[${lotto.join(StaticValue.PRINT_SEPARATOR)}]`;
  },
};

export default Convertor;
