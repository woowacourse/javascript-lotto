import NUMBER from '../constants/number';
import { pickNumbersInRange } from '../util/Random';
import Lotto from './Lotto';

/**
 * @module LottoPublisher 숫자로 로또를 개수만큼 발행하는 클래스입니다. 랜덤 숫자를
 * 돌려서 랜덤 숫자의 로또를 발행합니다.
 * @constructor count 발행하고 싶은 로또의 개수를 입력합니다.
 */
class LottoPublisher {
  #count;
  #lottoNumbers;

  constructor(count = 0, lottoNumbers = []) {
    this.#count = count;
    this.#lottoNumbers = lottoNumbers;
  }

  publishLottos() {
    if (!this.#lottoNumbers.length) {
      return this.#publishRandomLottos();
    }
    return this.#publishSelectLottos();
  }

  #publishRandomLottos() {
    return Array.from({ length: this.#count }, () => {
      const randomNumbers = this.#getRandomNumbers();
      this.#lottoNumbers.push(randomNumbers);
      return new Lotto(randomNumbers);
    });
  }

  #publishSelectLottos() {
    return this.#lottoNumbers.map((numbers) => {
      return new Lotto(numbers);
    });
  }

  #getRandomNumbers() {
    const numbers = pickNumbersInRange({
      from: NUMBER.LOTTO_START_NUMBER,
      to: NUMBER.LOTTO_END_NUMBER,
      count: NUMBER.LOTTO_LENGTH,
    });
    return numbers.sort((a, b) => b - a);
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoPublisher;
