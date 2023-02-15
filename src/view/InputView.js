import Console from '../util/Console.js';
import QUERY from '../constant/query.js';

const InputView = {
  async readLottoPrice() {
    return await parseInt(Console.readline(QUERY.LOTTO_PRICE), 10);
  },
};

export default InputView;
