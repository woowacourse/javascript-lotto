import { LOTTO_RULES } from './constant/index.js';
import { createRandomNumbers } from './utils/index.js';

const lottos = [];

const lottoGame = {
  createLottos(lottoCount) {
    for (let i = 0; i < lottoCount; i += 1) {
      lottos.push(
        createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT),
      );
    }

    return this.lottos;
  },
  getLottos() {
    return lottos.map((lotto) => [...lotto]);
  },
  resetLottos() {
    lottos.length = 0;
  },
};

export default lottoGame;
