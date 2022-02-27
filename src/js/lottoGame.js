import { LOTTO_RULES } from './constant/index.js';
import { createRandomNumbers } from './utils/index.js';

const lottoGame = {
  lottos: [],
  createLottos(lottoCount) {
    this.resetLottos();

    for (let i = 0; i < lottoCount; i += 1) {
      this.lottos.push(
        createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT),
      );
    }

    return this.lottos;
  },
  resetLottos() {
    this.lottos.length = 0;
  },
};

export default lottoGame;
