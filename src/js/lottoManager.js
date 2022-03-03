import { LOTTO_RULES, LOTTO_PRICE } from './constant/index.js';
import { createRandomNumbers } from './utils/index.js';

class LottoManager {
  #lottos = [];

  createLottos(lottoCount) {
    for (let i = 0; i < lottoCount; i += 1) {
      this.#lottos.push(
        createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT),
      );
    }

    return this.#lottos;
  }

  getLottos() {
    return this.#lottos;
  }

  calculateLottoCount(fare) {
    return Math.floor(fare / LOTTO_PRICE);
  }

  calculateRemainFare(fare) {
    return fare % LOTTO_PRICE;
  }
}

const lottoManager = new LottoManager();

export default lottoManager;
