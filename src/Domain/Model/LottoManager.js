import { LOTTO_DEFINITION } from '../Constant/Definition.js';

class LottoManager {
  constructor() {}

  purchaseLotto(money) {
    return money / LOTTO_DEFINITION.ONE_PRICE;
  }
}

export default LottoManager;
