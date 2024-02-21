import Random from '../utils/random.js';
import Lotto from './lotto.js';
import { LOTTO_RULES } from '../constant/index.js';

export default class LottoMachine {
  #cost;

  constructor(cost) {
    this.#cost = cost;
  }

  get getLottoCount() {
    return this.#cost / LOTTO_RULES.cost;
  }

  #makeOneLotto() {
    const lotto = new Lotto(
      Random.pickUniqueNumbersInRange({
        minNumber: LOTTO_RULES.min_number,
        maxNumber: LOTTO_RULES.max_number,
        count: LOTTO_RULES.length,
      }),
    );
    return lotto;
  }

  makeLottos(count) {
    return Array.from({ length: count }, () => this.#makeOneLotto());
  }
}
