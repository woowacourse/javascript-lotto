import Console from '../util/Console.js';
import QUERY from '../constant/query.js';

const InputView = {
  async readLottoPrice() {
    return await Console.readline(QUERY.LOTTO_PRICE);
  },
};

export default InputView;
