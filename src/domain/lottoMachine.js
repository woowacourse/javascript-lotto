import Random from '../utils/random.js';
import Lotto from './lotto.js';
import { LOTTO_RULES } from '../constant/index.js';

export default class LottoMachine {
  #cost;
  #lottos;

  constructor(cost) {
    this.#cost = cost;
    this.#makeLottos(this.getLottoCount);
  }

  get getLottoCount() {
    return this.#cost / LOTTO_RULES.cost;
  }

  get getLottoNumbers() {
    return this.#lottos.map((lotto) => lotto.getNumbers);
  }

  #makeOneLotto() {
    const lotto = new Lotto(
      Random.getRandomArray({
        minNumber: LOTTO_RULES.min_number,
        maxNumber: LOTTO_RULES.max_number,
        count: LOTTO_RULES.length,
      }),
    );
    return lotto;
  }

  #makeLottos(count) {
    this.#lottos = Array.from({ length: count }, () => this.#makeOneLotto());
  }
}
