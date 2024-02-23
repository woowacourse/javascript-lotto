import NUMBER from '../constants/number';
import Lotto from './Lotto';

/**
 * @module LottoPublisher 숫자로 로또를 개수만큼 발행합니다.
 * @constructor count 발행하고 싶은 로또의 개수를 입력합니다.
 */
class LottoPublisher {
  #count;

  constructor(count) {
    this.#count = count;
  }

  publishRandomLottos() {
    return Array.from({ length: this.#count }, () => {
      const randomNumbers = this.#getRandomNumbers();
      return new Lotto(randomNumbers);
    });
  }

  #getRandomNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < NUMBER.LOTTO_LENGTH) {
      lottoNumbers.push(Random.pickNumberInRange(NUMBER.LOTTO_START_NUMBER, NUMBER.LOTTO_END_NUMBER));
    }
    if (new Set(lottoNumbers).size !== NUMBER.LOTTO_LENGTH) {
      return this.#getRandomNumbers();
    }
    return [...lottoNumbers];
  }
}

export default LottoPublisher;
