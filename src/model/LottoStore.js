import Lotto from "./Lotto.js";
import RandomUtil from "../util/RandomUtil.js";
import MissionRandomUtil from "../util/MissionRandomUtil.js";
import { LOTTO } from "../constant/index.js";
import { ERROR_MESSAGE } from "../constant/message.js";

class LottoStore {
  #randomUtil;

  constructor({ randomUtil } = {}) {
    if (randomUtil) this.#validateRandomUtil(randomUtil);
    this.#randomUtil = randomUtil ?? new MissionRandomUtil();
  }

  #validateRandomUtil(randomUtil) {
    if (!(randomUtil instanceof RandomUtil)) {
      throw new Error(ERROR_MESSAGE.INVALID_RANDOM_UTIL);
    }
  }

  issuedLottos(amount) {
    const count = amount / LOTTO.PRICE;

    return Array.from({ length: count }, () => 
      new Lotto(this.#randomUtil.pickUniqueNumbers())
    );
  }
}

export default LottoStore;
