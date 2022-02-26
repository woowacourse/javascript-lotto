import repeatCallback from '../utils/repeat.js';
import Lotto from './Lotto.js';

/**
 * @module model/LottoBundle
 */

/**
 * @class module:model/LottoBundle.LottoBundle
 * @classdesc 6개의 숫자로 이뤄진 로또 배열을 구입된 로또 개수만큼 가지는 로또 번들 모델
 */
export default class LottoBundle {
  #lottos = [];

  /** @type {array} */
  get lottos() {
    return this.#lottos;
  }

  /** @param {number} count 구입되어 출력되어야 하는 로또의 개수 */
  createLottoBundle(count) {
    console.time('Array vs Set Performance Test');
    repeatCallback(count, () => this.#pushLottoToBundle());
    console.timeEnd('Array vs Set Performance Test');
  }

  /** @method pushLottoToBundle
   * @description 로또 티켓 한 장의 번호 배열을 로또 번들 배열에 넣는다.
   */
  #pushLottoToBundle() {
    const lotto = new Lotto();
    this.#lottos.push(lotto);
  }
}
