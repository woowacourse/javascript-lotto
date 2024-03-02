import NUMBER from '../constants/number.js';
import {pickNumbersInRange} from '../util/random.js';
import Lotto from './Lotto.js';
import WinLotto from './WinLotto.js';

/**
 * @module LottoPublisher 숫자로 로또를 개수만큼 발행하는 클래스입니다.
 * 랜덤 로또와 숫자를 지정하여 로또를 발행할 수 있습니다. 보너스 숫자를 추가하여 우승 로또를 발행할 수도 있습니다.
 * @constructor
 * @param {number} count 발행하고 싶은 로또의 개수를 입력합니다.
 * @param {Array<number[]>} lottoNumbers 발행하고 싶은 로또의 숫자를 배열로 입력합니다.빈배열일시 랜덤 로또가 발행됩니다.
 */

class LottoPublisher {
  #count;
  #lottoNumbers;

  constructor(count, lottoNumbers) {
    this.#count = count;
    this.#lottoNumbers = lottoNumbers;
  }

  publishLottos() {
    if (!this.#lottoNumbers.length) {
      return this.#publishRandomLottos();
    }
    return this.#publishSelectLottos();
  }

  publishWinLotto(bonusNumber) {
    const lottoWithWinNumbers = new Lotto(this.#lottoNumbers);
    const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    return winLotto;
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
      count: NUMBER.LOTTO_NUMBERS_LENGTH,
    });
    return numbers.sort((a, b) => b - a);
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoPublisher;
