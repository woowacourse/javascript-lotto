import generateRandomNumbers from '../utils/random.js';
import LOTTO from '../constants/lotto.js';

/**
 * @module model/Lotto
 */

/**
 * @class module:model/Lotto.Lotto
 * @classdesc 6개의 숫자로 이뤄진 로또 배열을 구입된 로또 개수만큼 가지는 로또 번들 모델
 */
export default class Lotto {
  constructor() {
    this.#generateLottoNumbers();
  }

  #numbers = [];

  /** @type {array} */
  get numbers() {
    return this.#numbers;
  }

  set numbers(newNumbers) {
    this.#numbers = newNumbers;
  }

  /** @method pushLottoToBundle
   * @description 로또 티켓 한 장의 배열에 로또 번호 6개를 랜덤으로 만들어서 넣는다. 인스턴스 생성 시점에 로또 번호를 numbers 멤버 변수에 바로 할당한다.
   */
  #generateLottoNumbers() {
    this.#numbers = generateRandomNumbers({
      count: LOTTO.NUMBER_COUNT,
      max: LOTTO.MAX_NUMBER,
      min: LOTTO.MIN_NUMBER,
    });
  }
}
