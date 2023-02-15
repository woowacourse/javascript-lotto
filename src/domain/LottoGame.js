import Random from '../util/Random.js';
import Lotto from './Lotto.js';

const LOTTO_PRICE = 1000;
const LOTTO_SIZE = 6;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

class LottoGame {
  #lottos;

  constructor(money) {
    const count = Math.floor(money / LOTTO_PRICE);
    this.#lottos = Array.from({ length: count }, () => {
      const randomNumbers = Random.generateUniqueNumbersInRange(
        LOTTO_SIZE,
        LOTTO_MIN_NUMBER,
        LOTTO_MAX_NUMBER,
      );

      return new Lotto(randomNumbers);
    });
  }

  static calculateTheChange(money) {
    return money % LOTTO_PRICE;
  }
}

export default LottoGame;
